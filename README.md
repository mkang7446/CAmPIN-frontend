
![logo](https://user-images.githubusercontent.com/92760530/163725919-613ac686-5b8a-423b-98c6-7280cacd7071.jpeg)

## Description
CamPIN is a full-stack website that lets a user to pin a camping location that they have been on a map and share camping expeirence.

## URL to deployed app
> [campin.netlify.app](https://campin.netlify.app/)

## URL to deplyed Django API
> [campin.netlify.app/](https://campin-project.herokuapp.com/)

## Demo
![project3-recording](../campin-frontend/src/assets/project3-recording.gif)

## Module Detail

### 1. Authentication and Profile
* A user is able to create an account or sign into an existing account. User emails are validated with token from Django.
* Upon sigining in, user will have access to create a new campground review, comment and put a pin on a map.

### 2. Search and View Campgrounds
* A user is able to search for a campground by name and access to campground detail page for description, location on a map and reviews with star rating function.
* An owner can only edit or delete their campground posting and review. 

### 3. Log and pin location on a map
* A user is able to plcae a pin on their own map as many as they want and there is a section to store an address for their campground records.

### 4. Community Page

* A user can communicate with other users in the community page with post and comment functions.

## Technologies and Tools Used
* Front-end => React.js | CSS3 | React-Bootstrap | Styled Components
* Back-end => Django | PostgreSQL
* Map & Geocoding => Google Map API
* Deploying App => Netlify (Front-end) | Heroku (Back-end)