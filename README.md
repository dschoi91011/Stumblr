<p align="center">
   <img src="https://github.com/dschoi91011/Stumblr/blob/main/stumblr.png?raw=true" alt="stumblr-logo-img" width="300" height="300">
</p>

##

Stumblr is inspired by Tumblr, a social media platform in which users are able to express themselves via multiple mediums. 
Stumblr allows users to create their own account and view other users' blogs.
The user is able to create, edit, and delete his/her own blog posts, read other users' comments on existing blogs, and post, edit, and delete his/her own comments.

[Live Site](https://stumblr.onrender.com/)

## 
<p align="center">
   <img src="https://github.com/dschoi91011/Stumblr/blob/main/stumblr_site_screenshot.png?raw=true" alt="stumblr-screenshot" width="650" height="auto">
</p>

## Contact:
[LinkedIn](https://www.linkedin.com/in/daniel-choi-905970275/)  
[Portfolio](https://dschoi91011.github.io/)

## Technologies Used:
![](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Features:

- __User authentication:__ Sign up, log in, and log out users.
- __Show all posts:__ Main page displays all posts by all users.
- __User posts:__ Each user has a display page of all his/her posts.
- __Show comments:__ Comments for each post can be toggled.
- __Post:__ Users can create, edit, and delete their own posts.
- __Upload image:__ Users can upload and edit images.
- __Comment:__ Users can write, edit, and delete their own comments.
- __Like posts:__ Users can like/unlike other posts.
- __One post:__ Users can view a post's details.

## Future Features:

- User follows
- Text blog entries
- Search/filter

## Getting started:

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com:

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the __dist__ folder located in
the root of your __react-vite__ folder when you push to GitHub. This __dist__
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your __react-vite__ folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the __Dockerfile__, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a __.env__ file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
__.env__ file. As you work to further develop your project, you may need to add
more environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

## Endpoints

### User Auth

| Request | Purpose | Return |
|---------|---------|--------|
| GET /api/auth/ | Sent on initial load and upon refreshes. Returns current user object, if one is logged in. | Current user object |


| Request | Purpose | Return |
|---------|---------|--------|
| POST /api/auth/login | Will attempt to log in user with provided credentials. Returns current user object if validations pass. | Current user object |


| Request | Purpose | Return |
|---------|---------|--------|
| POST /api/auth/signup | Signs up and logs in new user. Returns current user if validations pass. | Current user object |

* User Object:
```
{
   "id": integer,
   "first_name": string,
   "last_name": string,
   "email": email,
   "username": string,
   "profile_pic": string,
   "posts": array
}
```
### Posts

| Request | Purpose | Return |
|---------|---------|--------|
| GET /api/posts/ | Fetches all posts. | List of post objects |
| GET /api/posts/user/:id/posts | Fetches all of a user's posts. | List of post objects |
| GET /api/posts/:id | Fetches a post by its ID. | Post object |
| POST /api/posts/new-post | Creates a new post. | Post object |
| PUT /api/posts/:id | Update a post made by current user. | Post object |
| DELETE /api/posts/:id | Delete a post made by current user. | {"message": "Post deleted"} |

* Post Object:
```
{
   "posts": {
      "id": integer,
      "poster_id": integer,
      "username": string,
      "profile_pic": string,
      "body": string,
      "picture": string,
   }
}
```
### Comments

| Request | Purpose | Return |
|---------|---------|--------|
| GET /api/posts/:id/comments | Fetches all comments for a post. | List of comment objects |
| POST /api/posts/:id/comments/new | Creates a comment for a post. | Comment object |
| PUT /api/comments/:id | Edit a comment made by current user. | Comment object |
| DELETE /api/comments/:id | Delete a comment made by current user. | {"message": "Comment deleted"} |

* Comment Object:
```
{
   "comments: [
      {
         "id": integer,
         "user_id": integer,
         "post_id": integer,
         "username": string,
         "profile_pic": string,
         "content": string
      }
   ]
}
```
### Favorites

| Request | Purpose | Return |
|---------|---------|--------|
| GET /api/posts/favorites | Fetches all posts liked by a user. | List of favorite objects |
| POST /api/posts/:id/favorite | Like a post. | Favorite object |
| DELETE /api/posts/:id/favorite | Unlike a post. | {"message": "Unfavorited"} |

* Favorite Object:
```
{
   "favorites": [
      {
         "id": integer,
         "poster_id": integer,
         "username": string,
         "profile_pic": string,
         "picture": string,
         "body": string
      }
   ]
}
```





