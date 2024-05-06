# Parinaz-Yousefi-Watchlist

## Overview
Watchlist is a web app designed to help users discover and save their favorite movies and TV shows.

### Problem
Watchlist addresses the need for a centralized platform where users can store all their to-watch shows from different platforms while also discovering new ones.

### User Profile
**Movie Enthusiasts:**
-  Users who are looking for recommendations on what to watch.
-  Users who want to save all their shows from different platforms in one place.

### Features
**Saved Shows/Movies List**: Users can view a list of all their saved shows and movies.
**Random Movie/Show Generator:** Users can generate random movie or show suggestions based on genre.
**Discover List:** Users can discover trending movies and TV shows.
**Search Functionality:** Users can search for specific movies or TV shows.
**Genre Filtering:** Users can filter movies and shows based on selected genres.

## Implementation
**Tech Stack**
-  React
 -  Client Libraries:
  -   React
   -  Axios
   -  React Router

### APIs

-  The project utilizes The Movie Database (TMDb) API for fetching movie and TV show data.
  -  https://developer.themoviedb.org/docs/getting-started
  -  https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/details

### Sitemap
-  **Login to TMDb:** Allows users to authenticate and access their watchlist.
-  **User Watchlist:** Displays the user's saved shows and movies.
-  **Random Suggestion:** Generates a random movie or show suggestion based on genre.
-  **Search and Filter:** Enables users to search for and filter movies and TV shows.

### Mockups
-  Mockups for the project can be found in the watchlist folder.
### Data
-  The project fetches data from the TMDb API, including information about movies, TV shows, genres, and user watchlists.

### Endpoints
**GET/3/discover/movie**
-  lists top release of the month
**GET/3/discover/tv**
-  lists top release of the month
**GET/3/discover/movie/:id**
-  shows info  about the movie
**GET/3/discover/tv/:id**
-  shows info  about the show
**GET/3/find/{external_id}**
-  searches for a movie by name,id,cast,...
**GET/3/genre/movie/list**
-  lists all of the movies with the specific genre
**GET/3/genre/tv/list**
-  list all of the tv shows with the specific genre
**GET/3/genre/tv/:id**
-  id is generated randomly from selected genre
**GET/3/genre/movie/:id**
-  id is selected randomly from selected genre
**POST/list/:id**
-  adds the movie/tv to watchlist
**POST/list/:id**
-  edits(delete)movie/tv from the watchlist
### Auth
  The project includes authentication functionality for user login using their tmdb account.
## Roadmap
-  Create client:
  -   Set up a React project with routes and boilerplates.
  -  Develop the login page to store requested tokens.
  -  Deploy client and server projects so all commits are reflected in production.
-  Features:
  -  Sign up functionality.
  -  Discover feature to explore new content.
  -  Implement search functionality.
  -  Develop movie/TV show details pages.
  -  Add genre filtering.
  -  Implement random suggestion feature.
  -  Add functionality to add/remove from the watchlist.
-  Bug fixes.
-  Demo Day.

## Nice-to-haves

-  Users can discover each other's profiles to view their watchlists.
-  Users can leave comments on movies and TV shows.
