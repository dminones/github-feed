# Github Feed

React app that has an input box that you can enter a github user id and it shows you their last 30 public events.

## Getting Started

This app needs node and npm.

### Install and run dev app

```
npm install
npm start
```

### Testing

Unit testing provided for redux actions and reducers.

```
npm test
```

## Github Events

All github events has a similar JSON schema, but a unique payload object that is determined by its event type. See [Event Types & Payloads](https://developer.github.com/v3/activity/events/types/)

This app supports custom messages for most common event types, and handle with a default view other event types.

### Supported EventTypes Descriptions

- PushEvent
- PublicEvent
- WatchEvent
- PullRequestEvent
- CreateEvent

## About the App

This app is built using [Create React App](https://github.com/facebook/create-react-app).

### State Managment

The app uses redux to mantain state.

### App Laoyout and Styles

Styles accross the app supported by material-ui withStyles HOC.  
[Material UI](https://material-ui.com/) components are used for navbar, buttons and search bar.

## Github Pages Deploy

The app is deployed on github pages, instructions about the deploy on create-react-app guide.  
[https://dminones.github.io/github-feed/](https://dminones.github.io/github-feed/)
