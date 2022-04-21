
![logo](https://user-images.githubusercontent.com/92760530/163725919-613ac686-5b8a-423b-98c6-7280cacd7071.jpeg)

## Description
CamPIN is a full-stack website that lets a user to pin a camping location that they have been on a map and share camping expeirence.

## URL to deployed app
> [campin.netlify.app](https://campin.netlify.app/)

## URL to deplyed Django API
> [campin.netlify.app/](https://campin-project.herokuapp.com/)

## Demo
![project3-recording](/src/assets/project3-recording.gif)

## Functionality

### Sign In / Up
<img width="1714" alt="Screen Shot 2022-04-20 at 11 07 05 PM" src="https://user-images.githubusercontent.com/92760530/164386518-8317cb0a-0555-4dc5-baf0-818600ba7942.png">
<img width="1717" alt="Screen Shot 2022-04-20 at 11 07 17 PM" src="https://user-images.githubusercontent.com/92760530/164386522-82584e37-fc53-4b84-bf8e-319638de4904.png">

### Campgrounds List
<img width="1703" alt="Screen Shot 2022-04-20 at 11 07 46 PM" src="https://user-images.githubusercontent.com/92760530/164386574-ebf53f4a-cfaa-4fac-a9e4-ae1f7cdc3992.png">

### Campground detail
<img width="1705" alt="Screen Shot 2022-04-20 at 11 08 09 PM" src="https://user-images.githubusercontent.com/92760530/164386692-ee7aec9b-c3fb-48b8-8741-2f9c7ed32298.png">

### Page to place a pin on a map and log locations
<img width="1707" alt="Screen Shot 2022-04-20 at 11 08 59 PM" src="https://user-images.githubusercontent.com/92760530/164386749-23627004-27c2-4b51-ac3b-ff21aabb2ffe.png">

### Community page
<img width="1724" alt="Screen Shot 2022-04-20 at 11 09 12 PM" src="https://user-images.githubusercontent.com/92760530/164386766-c6660c62-fc20-4b14-b0dc-5ba44b914ca8.png">

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