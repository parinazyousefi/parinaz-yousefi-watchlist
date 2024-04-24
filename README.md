# parinaz-yousefi-watchlist

## Overview

What is your app? Brief description in a couple of sentences.

Watchlist is a web app to discover and save all of your favorite movies and TV shows.

### Problem
Watvhlist is a web app to store all of your to-watch shows from all diffrent platforms and discover new ones.

### User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account.
-Movie enthusiasts:
    -looking for what to watch
    -saving all of their shows on diffrent platforms in one place 
    -listing all of the

### Features

-A list of saved shows/movies
-A random movie/show generater based on genre
-Discover list which includes top 5 latest movies/tv shows
-Search functionallity
-List movie/show based on selected genre

## Implementation

### Tech Stack

-React
-Node.js
-MySQL
-Express
-Client libraries:
    -react
    -axios
    -react-router
-Server libraries:
    -knex
    -express
    -bcrypt for password hashing
    -uuid
### APIs

https://developer.themoviedb.org/docs/getting-started
https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/details

### Sitemap
-Register
-Login
-User watchlist
-Random suggestion
-Search and filter

### Mockups
Included in watchlist folder
### Data


### Endpoints
**GET/3/discover/movie**
-lists top release of the month
**GET/3/discover/tv**
-lists top release of the month
**GET/3/discover/movie/:id**
-shows info  about the movie
**GET/3/discover/tv/:id**
-shows info  about the show
**GET/3/find/{external_id}**
-searches for a movie by name,id,cast,...
**GET/3/genre/movie/list**
-lists all of the movies with the specific genre
**GET/3/genre/tv/list**
-list all of the tv shows with the specific genre
**GET/3/genre/tv/:id**
-id is generated randomly from selected genre
**GET/3/genre/movie/:id**
-id is selected randomly from selected genre
**POST/list/:id**
-adds the movie/tv to watchlist
**POST/list/:id**
--edits(delete)movie/tv from the watchlist
**POST/user/signup**
- Add a user account

Parameters:

- email: User's email
- name:User's name
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```
**POST/user/login**

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.
- Login a user

Parameters:
- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### Auth
- JWT auth
    - Before adding auth, all API requests will be using a fake user with id 1
    - Added after core features have first been implemented
    - Store JWT in localStorage, remove when a user logs out
    - Add states for logged in showing different UI in places listed in mockups

## Roadmap

-Create client
    -react project with routes and boilerplates
-Create server
    -express project with routing,with placeholder 200 responses
-Create migrations

- Deploy client and server projects so all commits will be reflected in production

-feature:sign up
-feature:login
-feature:discover
-feature:search
-feature:movie/tv details page
-feature:filter genre
-feature:random suggest 
-feature:add to list
-feature:remove from the list
- Bug fixes

- DEMO DAY


## Nice-to-haves

-The users are ables to discover each other profiles to view their lists
-The users are ables to leave comments
