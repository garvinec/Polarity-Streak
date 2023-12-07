import { useState, useEffect, useRef } from "react";
import "./App.css";
import darkMode from "./dark-theme.png";

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

  // make sure no matter where the user clicks, it focuses on the input box (which is hidden from them)
  const inputRef = useRef(null);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      inputRef.current.focus();
    });
  }, []);

  // Simultaneously shows what the user is typing in the text box
  const [inputValue, setInputValue] = useState("");
  const [frontText, setFrontText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [backText, setBackText] = useState("");
  const [streakCount, setStreakCount] = useState(0);
  const [highlightedLength, setHighlightedLength] = useState(0);
  const [firstLetter, setFirstLetter] = useState(0);

  // highlight current streak
  useEffect(() => {
    setFrontText(() => inputValue.substring(0, firstLetter));
    setHighlightedText(() =>
      inputValue.substring(firstLetter, firstLetter + highlightedLength)
    );
    setBackText(() => inputValue.substring(firstLetter + highlightedLength));
  }, [inputValue, firstLetter, highlightedLength]);

  function inputChangeHandler(s) {
    CountStreak(s.toLowerCase());
    setInputValue(s);
  }

  function isAlpha(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  // function that counts the streak
  function CountStreak(s) {
    let largestStreak = 0;
    let currentStreakLength = 0;
    let longestHighlighted = 0;
    let currentHighlightedLength = 0;
    let prevLetter = "Even";
    let firstLetter = 0;
    let temp = 0;
    for (let i = 0; i < s.length; i++) {
      if (isAlpha(s[i])) {
        // if it's an even alphabet and the previous letter was an even letter
        if (alpha_num.get(s[i]) % 2 === 0 && prevLetter === "Even") {
          currentStreakLength += 1;
          currentHighlightedLength += 1;
        }
        // if it's an even alphabet and the previous letter was an odd letter
        else if (alpha_num.get(s[i]) % 2 === 0 && prevLetter === "Odd") {
          currentStreakLength = 1;
          currentHighlightedLength = 1;
          prevLetter = "Even";
          temp = i;
        }
        // if it's an odd alphabet and the previous letter was an odd letter
        else if (alpha_num.get(s[i]) % 2 !== 0 && prevLetter === "Odd") {
          currentStreakLength += 1;
          currentHighlightedLength += 1;
        }
        // if it's an odd alphabet and the previous letter was an even letter
        else if (alpha_num.get(s[i]) % 2 !== 0 && prevLetter === "Even") {
          currentStreakLength = 1;
          currentHighlightedLength = 1;
          prevLetter = "Odd";
          temp = i;
        }
        // should not reach here
        else {
          console.log("It shouldn't get here");
        }
        // update current streak indices if needed
        if (currentStreakLength > largestStreak) {
          largestStreak = currentStreakLength;
          longestHighlighted = currentHighlightedLength;
          firstLetter = temp;
        }
        // largestStreak = Math.max(currentStreakLength, largestStreak);
      } else if (s[i] === " ") {
        currentHighlightedLength += 1;
      } else {
        currentStreakLength = 0;
        currentHighlightedLength = 0;
        temp = i + 1;
      }
    }
    setStreakCount(largestStreak);
    setFirstLetter(firstLetter);
    setHighlightedLength(longestHighlighted);
  }

  // dark mode function
  function toggleDark() {
    document.body.classList.toggle("dark_mode");
  }

  return (
    <div>
      <div className="topBar">
        <img
          id="toggle"
          src={darkMode}
          alt="lightdarkmode-toggle"
          onClick={toggleDark}
        />
      </div>
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
            type="text"
            ref={inputRef}
            style={{ opacity: 0 }} // hides input from user
            onChange={(e) => inputChangeHandler(e.target.value)}
            autoFocus
          />
          <div className="textbox">
            <div className="textFront">{frontText}</div>
            <div className="highlighted">{highlightedText}</div>
            <div className="textBack">{backText}</div>
            <div className="caret">|</div>
          </div>
          <div className="streakCounter">{streakCount}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
