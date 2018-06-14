# Structure Take Home V.1.0.0

**This is a take home task that attempts to gauge:**

* Attention to detail
* Simplicity of written code
* Knowledge of CSS
* Clarity of written CSS/JS/HTML
* Knowledge of Javascript (ES6 Features (classes, arrow functions), working with a flux store)
* Knowledge of React (appropriate use of state/props and component design)
* Clarity of HTML/JSX (being able to write simple html inside react)

_This should take about an hour. You should prioritize what you want to get done. (Don't spend more than 2 hours on it!)_

## Start Here:

0.  You will need to fork or clone this repo. 

1.  You'll need to be able to serve this directory. Python is useful for this. Use the below command to serve:

    If you have python2: `python –m SimpleHTTPServer 8000`

    If you have python3: `python –m http.server 8000`

2.  You should be able to see the web app at localhost:8000

## The Actual Task:

_Can you see the congratulations message? Great! But before we start downing shots of champagne, there are few things wrong with this app. First we are serving the `OldTakeHome` app instead of the `RealTakeHome` app. Lets start by fixing that in `main.js`_

* This take home task is a small simple react app. There is an `index.html` which loads a `main.js` and `style.css` file. We are also loading Babel so we can use ES6 features like classes, arrow functions and methods like `Object.assign` (which we like), and React (which we also like).

* For simplicity we put all the JS in `main.js`. (You don't have to worry about imports)
* `main.js` includes a data store called `store`, functions to update the store, some react components. A few functions are incomplete and may help with the task.
* `main.js` is a guideline, with hints to what we are looking for. But you can improve on the code if you wish.

To begin, get the `RealTakeHome` Component rendering to the screen and *make an initial commit*. You should see the beginnings of a dog adoption web-app. It should let a user adopt/disown virtual dogs all from the comfort of his/her home! Your task is to make it look and feel like the screenshots in `dont_edit_me/screenshots/`. Here are the things that need to be fixed in no particular order:

* All the data on the page (Dog name and age) is hardcoded, but should be populated from the store. There is a react component called `ConnectToStore`. This will take whatever data is in the store and pass it down via props to a child component. We are already passing the `dogs` prop. e.g. `<ConnectToStore><RealTakeHome /></ConnectToStore>` will make `this.props.dogs` available to the `RealTakeHome` component. (This is called the Higher Order Component (H.O.C.) pattern)
* The name of any dog that is selected should be made bold and UPPERCASE.
* When you press the `Adopt all selected` button, all currently selected dogs should be removed from the adoptable dogs list. Each Dog's name should be added to the Recently Adopted list.
* When you press the `Disown` button next to a Recently Adopted Dog's name, it should be removed from the recently adopted list and reappear along with it's age in the adoptable dogs list.
* There is very little styling on the page. Make the app look more like the screenshots in `dont_edit_me/screenshots/`.
 * Do not spend too much time on CSS.
 * You can use modern CSS (like grid).
 * There should be no more than 2 dog cards in a row.
 * Font is `sans-serif`.
 * Alignment and basic responsiveness are important.
 * Spacing, colors can be approximate.

Bonus Points:

* The 'recently adopted' list should really be its own react component...
* Does the app still look good given unexpected data in the store?
* The list of recently adopted dogs should update 5 seconds after the store is updated. (It takes time to prepare a dog for adoption, The H.O.C. pattern might be useful)

When you are done, make a final commit and push your changes to your own git repo and send me a link (or send a ZIP File of the whole repo).
That's it you are done! 

## FAQ

* If there is anything preventing you from completing this task (e.g. Facebook mistakenly replacing the react CDN with endless streams of personal data) please contact Chening.

* Some instructions are left intentionally vaugue. Use your best guess to fill in the gaps.

* Leave any feedback/suggestions/typos (i.e. Say we spelt 'vague' wrong) in this file under Feedback:

## Feedback

* ...
