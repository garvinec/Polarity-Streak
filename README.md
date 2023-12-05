## Polarity Streak:

This application takes in user typed input, and displays the longest "even" or "odd" streak of letters.
Evenness for the letters alternates with a = even, b = odd, c = even, d = odd etc.

A few gotchas:

- Whitespace neither counts for a streak, nor breaks a streak
- Non-alphabetic characters including numbers break a streak
- Capitalization does not matter

The total streak counter is placed underneath the displayed string

## Initialize and testing out the app:

First, cd into "api" and run:

### `pip install -r requirements.txt`

If pip isn't installed, you can install it using these instructions:
https://pip.pypa.io/en/stable/installing/

Then, run:

### `flask run`

This opens up the server on port 3000 of localhost.

In the main project directory (cd ..), you can run:

### `npm start`

This will most likely open up a tab in your browser window pointed to localhost:3000. If not, copy and paste localhost:3000 into your browser's url.

## Credit

I would like to thank Solomon Park for this fun project idea!
