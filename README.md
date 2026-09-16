# Real Painter🏴

I built this application using <a href="https://github.com/gorilla/websocket/">Gorilla Websocket</a> for sending and receiving messages from multiple users in real time. The frontend uses common HTML and JS.
The goal of this project for me was to learn a bit about building a backend server for user to user interaction.
The app is composed of a blank canvas that users simultaneously paint on, the server doesn't know what's the current canvas state, so whenever you load the page, the canvas is cleared.
To see other people's paintings you must be watching them draw live, currently, there is no database for storing past inputs.

## Instructions📜

To check out this app go to <a href="https://realpainter.vercel.app/">Real Painter</a>.
The canvas

1) Select a color and a brush size for you to paint.
2) If you desire, you may hide the paint options panel by pressing the hide button.
3) Send the link to a friend and have fun painting together!

## 🚧 Work in progress! 🚧

- [ ] implement a database for keeping track of user's drawings
- [ ] handle some frontend/backend issues
- [ ] implement user messages

## Preview🏳️



## Concepts Applied🏴

- Websocket
- Backend API and Server
