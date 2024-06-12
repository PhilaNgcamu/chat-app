# Chat Application

This is a chat application built with React Native and Firebase. It includes features such as private chats, group chats, and user statuses.

## Components

### All Chats List

The `ChatList` component displays a combined list of group and individual chats, along with user statuses.

#### Props

- `navigation`: Provided by React Navigation to navigate between screens.

#### State

- `items`: Array of chat and contact items.
- `statuses`: Array of user status items.
- `searchQuery`: The search query entered by the user.

#### Description

- Fetches and displays chat and contact items from Firebase Realtime Database.
- Allows users to search for contacts and chats.
- Displays user statuses at the top.
- Navigates to the `ChatScreen` for group chats or `PrivateChat` for individual chats when an item is pressed.

### Individual Chat

The `PrivateChatScreen` component handles individual chat interactions, displaying messages and allowing users to send new messages and images.

#### Props

- `route`: Provided by React Navigation, contains `contactId`, `contactName`, and `contactAvatar`.
- `navigation`: Provided by React Navigation to navigate between screens.

#### State

- `messages`: Array of messages in the chat.
- `newMessage`: The text of the new message being typed.
- `isTyping`: Boolean indicating if the current user is typing.
- `otherUserTyping`: Boolean indicating if the other user is typing.
- `otherUserName`: The name of the other user.
- `isOnline`: Boolean indicating if the other user is online.
- `image`: URI of the selected image.

#### Description

- Fetches and displays messages from Firebase Realtime Database.
- Marks messages as read when displayed.
- Allows users to send text messages and images.
- Updates typing status in the database.
- Displays the online status and typing status of the other user.

## Firebase Setup

1. Set up a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Firebase Realtime Database.
3. Enable Firebase Authentication and set up the desired authentication methods (e.g., Email/Password, Google Sign-In).
4. Update the Firebase configuration in `firebaseConfig.js`.

## Installation

1. Clone the repository.
2. Run `npm install` or `yarn install` to install dependencies.
3. Set up Firebase and update the configuration in `firebaseConfig.js`.
4. Run the app using `npm start` or `yarn start`.

## Dependencies

- React Native
- Firebase
- React Navigation
- Expo

## License

This project is licensed under the MIT License.
