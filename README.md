# Table of Contents:
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installing & getting started](#installing--getting-started)
- [Configuring prettier](#configuring-prettier)
- [Available hooks](#available-hooks)
  -  [Use event listener](#use-event-listener)
  -  [Use key press](#use-key-press)
  -  [Use enter esc events](#use-enter-esc-events) 
  -  [Use page bottom](#use-page-bottom)
  -  [Use window size](#use-window-size)
  -  [Use lock scroll](#use-lock-scroll)
  -  [Use outside click](#use-outside-click)
  -  [Use mobile detect](#use-mobile-detect)
  -  [Use touch screen detect](#use-touch-screen-detect)
  -  [Use pagination](#use-pagination)
  -  [Use async pagination](#use-async-pagination)
  -  [Use deep linking pagination](#use-deep-linking-pagination)
  -  [Use array](#use-array)
  -  [Use boolean](#use-boolean)
  -  [Use copy to clipboard](#use-copy-to-clipboard)
  -  [Use document title](#use-document-title)
  -  [Use external script](#use-external-script)
  -  [Use external style](#use-external-style)
  -  [Use countdown](#use-countdown)
  -  [Use interval](#use-interval)
  -  [Use timer](#use-timer)
  -  [Use debounce](#use-debounce)
  -  [Use fetch](#use-fetch)
  -  [Use fetch with service](#use-fetch-with-service)
  -  [Use magnify](#use-magnify)
  -  [Use tilt](#use-tilt)
  -  [Use previous value](#use-previous-value)
  -  [Use router](#use-router)
- [Available scripts](#available-scripts)

## Overview:

This project groups a very useful list of custom react hooks and shows you how to use them as well.

## Prerequisites:

- nodeJS > 14.X.X or Docker

## Installing / Getting Started:

### Development (locally):

- Clone repo => `git clone git@github.com:DonAdam2/webpack-react-boilerplate.git`
- Navigate to project directory `cd webpack-react-boilerplate`
- Install dependencies => `yarn install`
- Start the development server => `yarn start`

### Development (using Docker):

- Clone repo => `git clone git@github.com:DonAdam2/webpack-react-boilerplate.git`
- Navigate to project directory `cd webpack-react-boilerplate`
- Install dependencies (required for prettier) => `yarn install`
- Start the development server => `docker-compose up web-dev`

### Windows subsystem for linux "WSL2" (for Docker):

- If you are using Windows 11 or 10, it's recommended to use WSL2:
  - [Install WSL on windows](https://pureinfotech.com/install-wsl-windows-11/)
  - [Install docker on windows](https://docs.docker.com/desktop/install/windows-install/)
  - Open docker desktop app:
    - settings => resources => WSL integration => enable required Ubuntu integration
  - [Setup SSH keys (if you want) on windows and share it with WSL](https://devblogs.microsoft.com/commandline/sharing-ssh-keys-between-windows-and-wsl-2/)
  - Create a new directory in ubuntu:
  ```
  mkdir workspace
  cd workspace
  ```
  - Clone this repo into the selected Ubuntu:
  ```
  git clone git@github.com:DonAdam2/webpack-react-boilerplate.git
  ```
  - Install curl in Ubuntu:
  ```
  sudo apt-get install curl
  ```
  - Install nvm:
  ```
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  ```
  - Install required node version:
  ```
  nvm install --lts
  ```
  - Install yarn globally:
  ```
  npm install -g yarn
  ```
  - Update permissions to be able to install NPM packages
  ```
  sudo chown -R $(whoami) ~/workspace/webpack-react-boilerplate
  ```
  - Install packages (for linting purposes):
  ```
  yarn install
  ```
  - Run docker for development:
  ```
  docker-compose up web-dev
  ```

## Docker for production (_basic setup_) (modify it to your needs):
- Update the **_production_** section of the **_Dockerfile_** to meet your needs
- Run the following command to build your image => `docker-compose up web-prod`

## Configuring Prettier

This build relies on [Prettier formatter](https://prettier.io/) to enforce code style. And [ESLint](https://eslint.org/) for identifying problematic patterns found in the code.

- Setting up prettier:

  1- You can find steps on how to set up prettier formatter with WebStorm/PhpStorm [here](https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher).

  **Notes**:

  - It's better to use the local `node_modules` version of prettier instead of a global one, to avoid version conflicts (in case the globally installed version does not match the version specified in `package.json`).

  2- Follow the next steps to set up **prettier** and **eslint** in **_VS Code_**:

  - Install `prettier` plugin

  - Install `eslint` plugin

  - Open **_VS Code settings_** `CTRL + ,`:

    a- Search for `formatter` => check **Format on save**

    b- Search for `prettier` => add `.prettierrc` in **_Prettier: Config Path_** section && check **_Prettier: Require Config_**

  3- Please refer to other tutorials if you are using a different IDE.

## Available hooks

  ### Use event listener:

  - This hook allows you to attach the required event to the required target (default is _window_) and remove it on unmount
  - It takes the following arguments:
    - **eventName**: required event name to trigger
    - **handler**: handler to attach to the given event
    - **element**: target element (default is _window_)

  ### Use key press:

  - This hook makes it easy to detect when the user is pressing a specific key on their keyboard.
  - It takes target key as an argument
  - It returns a boolean which detects if the target key is being pressed or not

  ### Use enter esc events:

  - This hook allows you to fire events on enter or ESC buttons
  - It takes the following arguments:
    - **cancelHandler**: a function to trigger on ESC button press
    - **confirmHandler**: a function to trigger on enter button press

  ### Use page bottom:

  - This hook allows you to detect if  you are at the bottom of the page.
  - Can be used to implement infinite scroll functionality.

  ### Use window size:

  - This hook return the width and the height of the window

  ### Use lock scroll:

  - Sometimes you want to prevent your users from mbeing able to scroll the body of your page while a particular component is absolutely positioned over your page (think of a modal)
  - It takes the following arguments:
    - **targetElement**: target element to lock scroll (default => document.body)
    - **immediate**: a boolean to detect when to lock scroll (default => true)

  ### Use outside click:

  - This hook allows you to trigger an event on the required element if clicked outside
  - It takes the following arguments:
    - **ref**: required element ref
    - **callback**: a function to trigger if clicked outside the required element

  ### Use mobile detect:

  - This hook allows you to detect if your user is using your app from a mobile or not

  ### Use touch screen detect:

  - This hook allows you to detect if your user is using a touch screen device to access your app or not

  ### Use pagination:

  - This hook gives you pagination functionality out of the box, which can be integrated with any pagination component.
  - It takes the following arguments:
    - **contentPerPage**: how many elements to display per page?
    - **count**: total length of elements
  - It returns the following:
    - **currentPageNum**: active page number
    - **totalPages**: total number of pages
    - **paginationBlocks**: pagination blocks (numbers and right, left "can be used to add icons in the correct place") 
    - **navigateToNextPage**: function to navigate to the next page
    - **navigateToPrevPage**: function to navigate to the previous page
    - **navigateToPage**: function to navigate to the required page
    - **navigateToFirstPage**: function to navigate to the first page
    - **navigateToLastPage**: function to navigate to the last page
    - **navigateToNextPaginationBlock**: function to navigate to the next pagination block
    - **navigateToPrevPaginationBlock**: function to navigate to the previous pagination block
    - **firstContentIndex**: first element index of the current page (can be used in slice function to display the content of the current page)
    - **lastContentIndex**: last element index of the current page (can be used in slice function to display the content of the current page)

  ### Use async pagination:

  - This hook gives you asynchronous pagination functionality (tied with an API call) out of the box, which can be integrated with any pagination component.
  - It takes the following arguments (same as [Use pagination](#use-pagination) hook), plus the following:
    - **fetchData**: function to fetch data using an API (it takes the current page as an argument)
  - It returns the following (same as [Use pagination](#use-pagination) hook), plus the following:
    - **resetCurrentPageNum**: function to reset current page number (usefull if you want to reset the current page number after making an API call in another part of your app "e.g. search API")
  - And without the following (because we are getting data from an API):
    - **firstContentIndex**
    - **lastContentIndex**

  ### Use deep linking pagination:
  
  - This hook gives you pagination functionality with deep linking (current page as search params in the URL) out of the box, which can be integrated with any pagination component.
  - If you refresh the page you will be landed on the correct page number specified in the URL.
  - It takes the following arguments (same as [Use pagination](#use-pagination) hook), plus the following:
    - **deepLinkingData**: it has **pageNumKey** which gives you the ability to set search params key in the URL
  - It returns the same as props as [Use pagination](#use-pagination) hook.

  ### Use array:

  - This hook makes it easier to manage an array by wrapping some functionalities of it (which can be extended to your needs).
  - It takes an array as an argument, and it returns the new array and a list of functions to apply on it

  ### Use boolean:
  
  - This hook gives you the ability to control boolean state
  - It takes true or false as an argument
  - It returns current boolean value and (toggle, on and off) functions

  ### Use copy to clipboard:

  -  This hook allows you to copy text to the clipboard and displays a confirmation toast (using react-toastify) on success.
  - It returns the following:
    - Boolean to detect if text is copied or not
    - Function (takes the required text to copy as an argument) to copy text

  ### Use document title:

  - This hook allows you to change document title
  - It takes **title** as an argument

  ### Use external script:

  - This hook makes it super easy to dynamically load external script and know when it's loaded. This is useful when you need to interact with a 3rd party library (Moyasar, stripe, etc) and you'd prefer to load the script when needed rather than include it in the document body.
  - It takes the following arguments:
    - **src**: 3rd party script URL
    - **immediate**: a boolean to detect when to inject it in the DOM
  - It returns a string status (idle, loading, ready, error)

  ### Use external style:

  - Similar to [Use external script](#use-external-script) hook but for external styles

  ### Use countdown:

  - This hook allows you to have a controlled count down.
  - It takes the following arguments:
    -  **initialCounter**: required time in seconds
    - **callback**: a function which gets the current counter value as an argument
  - It returns the following:
    - **counter**: current counter value
    - **resetCounter**: a function to reset the counter
    - **stopCounter**: a function to stop the counter
    - **pauseCounter**: a function to pause the counter
    - **resumeCounter**: a function to resume the counter
    - **isStopBtnDisabled**: a boolean to detect if the stop counter button is disabled
    - **isPauseBtnDisabled**: a boolean to detect if the pause counter button is disabled
    - **isResumeBtnDisabled**: a boolean to detect if the resume counter button is disabled

  ### Use interval:
  
  - This hook allows you to have interval functionality

  ### Use timer:

  - This hook gives you timer functionality
  - It returns the following:
    - **renderedStreamDuration**: current duration to display
    - **isStartBtnDisabled**: boolean to detect if the start button is disabled
    - **isStopBtnDisabled**: boolean to detect if the stop button is disabled
    - **isPauseBtnDisabled**: boolean to detect if the pause button is disabled
    - **isResumeBtnDisabled**: boolean to detect if the resume button is disabled
    - **startHandler**: function to start the timer
    - **stopHandler**: function to stop the timer
    - **pauseHandler**: function to pause the timer
    - **resumeHandler**: function to resume the timer

  ### Use debounce:

  - This hook allows you to have a debounced input. For example if you want to make an API call on key press
  - It takes the following arguments:
    - **searchTerm**: target input value
    - **delay**: required delay in milliseconds
  - It returns the debounced search term which can be used to make an API

  ### Use fetch:

  - This hook allows you to fetch data easily on demand (using axios).
  - It takes the following arguments:
    - **url**: API url
    - **options**: API options (default => null)
    - **initialDataType**: expected data type of the response
    - **immediate**: a boolean to detect when to make an API (default => true) (can be used to make an API on button click)
  - It returns the following:
    - **data**: API response on success
    - **error**: API error on error
    - **isLoading**: a boolean to detect API progress

  ### Use fetch with service:

  - This hook allows you to fetch data easily using a service (using axios with interceptors).
  - It takes the following arguments:
    - **api**: required service API
    - **initialDataType**: expected data type of the response
    - **immediate**: a boolean to detect when to make an API (default => true) (can be used to make an API on button click)
  - It returns the same data as [Use fetch](#use-fetch) hook

  ### Use magnify:

  - This hook allows you to magnify the given image
  - It takes **magnifyTimes** as an argument (decimal) which specifies how much you want to magnify your image
  - It returns the modified image ref

  ### Use tilt:

  - This hook allows you to tilt the given HTML element
  - It returns the modified HTML element ref

  ### Use previous value:

  - This hook returns the previous value of props or state.
  - It takes required value of props or state as an argument

  ### Use router:

  - This hook wraps all react router v6 hooks and exposes just the data and methods we need
  - It returns the following:
    - **navigate**: navigate function from **useNavigate** hook
    - **location**: location object from **useLocation** hook
    - **pathname**: current pathname from **useLocation** hook
    - **params**: an object of current params from **useParams** hook
    - **searchParams**: an object of all search params from **useSearchParams** hook 
    - **setSearchParams**: a function to set search params from **useSearchParams** hook

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
It will open [http://localhost:3000](http://localhost:3000) automatically in the browser to see your app.

All changes will be injected automatically without reloading the page.<br>

You will see in the console the following:

- Any of the following errors:
  1. Linting errors.
  2. Code format errors (because of [prettier](https://prettier.io/))

### `yarn build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn build:serve`

Serves the app on `http://localhost:8080/` from the `dist` folder to check the production version.

**_Note:_** Use this script only if you ran the build script `yarn build`.

### `yarn analyze-bundle`

It allows you to analyze the bundle size.
