# AtHomeTogether

## Overview

AtHomeTogether is a website to find video group calls to fit your needs-- whether it be a group study session, yoga lessons, or a video call party -- you can use the search engine on AtHomeTogether to find the right community for you. Have access to video calls 24/7 and meet new friends who share similar interests. Users can register with a username and password so they can join the groups they're interested in and have easy access to the group call links. 

## Data Model

The application will store users, list of all groups, and list of groups the user has joined

* users can start a group and add it to the general list of groups (array)
* users will have a list of groups they're following (array)


An Example User:

```javascript
{
  username: "here4studdybuddies",
  hash: // a password hash,
  groupslist: // an array of group objects representing groups user has joined
}
```

An Example Group:

```javascript
{
  name: "StudyGroup",
  icon: //image 
  arrMembers: // an array of user objects representing members
}
```

An Example Group List:

```javascript
{
  arrGroups: //array of all groups
}
```


## [Link to Commented First Draft Schema](db.js) 

## Wireframes

/home - page to see posts by people in the groups you're a part of

![home](documents/home.png)

/explore - page for seeing active group calls and exploring other groups to join

![explore](documents/explore.png)

/post - page to submit form to post group call link to groups

![post](documents/post.png)

## Site map
                  
![site map](documents/sitemap.png)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a non-registered and registered user, I can browse explore page and see posts
3. as a registered user, I can log in to the site 
4. as a user, I can join a group 
5. as a user, I can view the list of groups I'm a part of and see recent posts related to those groups

## Research Topics

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * user has option to register. user + their info (hashed) is saved into an array. they then have the option to log in and ideally will be told if there was an error.  
    
* (3 points) Perform client side form validation using JavaScript library (https://validatejs.org/)
    * errors integrated into the DOM w/ error messages

* (1-2 points) Use a CSS framework throughout site 
    * Using Bootstrap 
    * https://bootstrapmade.com/demo/MyPortfolio/ inspiration 

9-10 points total out of 8 required points 

## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

1. [passport.js authentication docs](http://passportjs.org/docs)(https://www.youtube.com/watch?v=-RCnNyD0L-s) - Source Code Based On This: https://github.com/nyu-csci-ua-0480-008-spring-2020/MelindaCardenas-final-project/blob/2aade6bfe723c9679b4720b613f53c3eb4da26ce/passport-config.js#L1-L34 
2. [bootstrap inspiration](https://bootstrapmade.com/demo/MyPortfolio/) - Source code non existent yet


