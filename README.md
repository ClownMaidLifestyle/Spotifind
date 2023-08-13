### [Spotifind](https://spotifind-search.netlify.app/)

# Shaghayegh Asadi, Elisa Edson, Joe Jardine, Nicholas Lewis

## What is it?

Spotifind is a single page web app that utilised the Spotify API to allow a user to search through the full spotify database of songs

## The problem:

The spotify in-app search feature is rather minimal and doesn't allow the user to apply filters to the full extent that the search query is capable of,
Spotifind will allow users to more accurately search songs

## Versioning:

1.0.0

## Libraries and dependencies

Spotify API
Express
MongoDB
React
Axios
CORS
Nodemon
AuthO

## Instructions to run

Server:
```bash
cd server
npm i 
npm start
```

Client:
```bash
cd client
npm i 
npm start
```

## API endpoints

- "/" Health Check
- "/auth" get client credential (no user data)
- "/search" Fetch Search Query results
- "/userAuth" redirects user to spotify authorisation to grant permissions to spotifind
- "/userAuthStage2" retrieve user access key
- "/profile" retrieve user profile information

- "/library" - MongoDB management
= "/library/:_id/" - Delete Songs from MongoDB

## Database Schemas

const songSchema = new Schema({
title: String,
artist: String,
year: Number,
});

![Wireframe](https://cdn.discordapp.com/attachments/1136987960999424115/1137016242927042631/Screenshot_2023-08-04_at_14.36.21.png)

[Planning Google Doc Link:] (https://docs.google.com/document/d/193b7q9YBivYPaPiy6XJULTaY5wFbqD7mCWSuaSV-HuE/edit?usp=sharing)
