import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("/alph-a-row", {
      method: "POST",
      body: JSON.stringify({}),
      headers: new Headers({
        "content-type": "application/json",
      }),
    }).then(async (res) => {
      try {
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  // Create a map to pair each alphabet to a number
  const alpha_num = new Map([
    ["a", 0],
    ["b", 1],
    ["c", 2],
    ["d", 3],
    ["e", 4],
    ["f", 5],
    ["g", 6],
    ["h", 7],
    ["i", 8],
    ["j", 9],
    ["k", 10],
    ["l", 11],
    ["m", 12],
    ["n", 13],
    ["o", 14],
    ["p", 15],
    ["q", 16],
    ["r", 17],
    ["s", 18],
    ["t", 19],
    ["u", 20],
    ["v", 21],
    ["w", 22],
    ["x", 23],
    ["y", 24],
    ["z", 25],
  ]);

  useEffect(() => {
    document.querySelector(".textbox").focus();
  }, []);

  // Simultaneously shows what the user is typing in the text box
  const [inputValue, setInputValue] = useState("");
  const [streakCount, setStreakCount] = useState(0);

  function isAlpha(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  // function that counts the streak
  function countStreak(s) {
    let largestStreak = 0;
    let currentStreakLength = 0;
    let prevLetter = "Even";
    let firstLetter = 0;
    let lastLetter = 0;
    for (const letter of s.split(" ").join("")) {
      if (isAlpha(letter)) {
        // if it's an even alphabet and the previous letter was an even letter, add the letter to temp
        if (alpha_num.get(letter) % 2 === 0 && prevLetter === "Even") {
          currentStreakLength += 1;
        }
        // if it's an even alphabet and the previous letter was an odd letter, check if temp.length is bigger than the current largest odd streak. if so, replace it, and then clear temp.
        else if (alpha_num.get(letter) % 2 === 0 && prevLetter === "Odd") {
          currentStreakLength = 1;
          prevLetter = "Even";
        }
        // if it's an odd alphabet and the previous letter was an odd letter
        else if (alpha_num.get(letter) % 2 !== 0 && prevLetter === "Odd") {
          currentStreakLength += 1;
        }
        // if it's an odd alphabet and the previous letter was an even letter, check if temp.length is bigger than the current largest even streak. if so, replace it, and then clear temp.
        else if (alpha_num.get(letter) % 2 !== 0 && prevLetter === "Even") {
          currentStreakLength = 1;
          prevLetter = "Odd";
        }
        // should not reach here
        else {
          console.log("It shouldn't get here");
        }
        largestStreak = Math.max(currentStreakLength, largestStreak);
      } else {
        currentStreakLength = 0;
      }
    }

    setStreakCount(largestStreak);
  }

  // function that highlights the letters that are part of the streak

  return (
    <div className="main">
      <div className="top">
        <h1>Polarity Streak!</h1>
        <div className="instruction">
          Try to make the longest "even" or "odd" streak of letters! Evenness
          for the letters alternates with a being even, b is odd, c is even, d
          is odd...
        </div>
      </div>
      <div className="bottom">
        <input
          className="textbox"
          type="text"
          // value={inputValue}
          onChange={(e) => countStreak(e.target.value)}
          autoFocus
        />
        <div className="streakCounter">{streakCount}</div>
      </div>
    </div>
  );
}

export default App;
