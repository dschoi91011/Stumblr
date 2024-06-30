<p align="center">
   <img src="https://github.com/dschoi91011/Stumblr/blob/main/stumblr.png?raw=true" alt="stumblr-logo-img" width="300" height="300">
</p>

##

Stumblr is inspired by Tumblr, a social media platform in which users are able to express themselves via multiple mediums. 
Stumblr allows users to create their own account and view other users' blogs.
The user is able to create, edit, and delete his/her own blog posts, read other users' comments on existing blogs, and post, edit, and delete his/her own comments.

[Live Site](https://stumblr.onrender.com/)

## Screenshots:
![ScreenRecording2024-06-23at7 11 00PM-ezgif com-video-to-gif-converter](https://github.com/ckang021/welp/assets/104466769/dc9c3895-73aa-44f7-8c43-b353fdf7b40d)

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

# Backend API-Routes 🚙

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## USER AUTHENTICATION/AUTHORIZATION 👥

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* **Request:** endpoints that require authentication
* **Error Response:** Require authentication
  * **Status Code:** 401
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the correct role(s) or permission(s).

* **Request:** endpoints that require proper authorization
* **Error Response:** Require proper authorization
  * **Status Code:** 403
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* **Require Authentication:** false
* **Request:**
  * **Method:** GET
  * **URL:** `/api/session`
  * **Body:** none
* **Successful Response when there is a logged in user:**
  * **Status Code:** 200
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```
* **Successful Response when there is no logged in user:**
  * **Status Code:** 200
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's information.

* **Require Authentication:** false
* **Request:**
  * **Method:** POST
  * **URL:** `/api/session`
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```
* **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```
* **Error Response: Invalid credentials**
  * **Status Code:** 401
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```
* **Error Response: Body validation errors**
  * **Status Code:** 400
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current user's information.

* **Require Authentication:** false
* **Request:**
  * **Method:** POST
  * **URL:** `/api/users`
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```
* **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```
* **Error Response: User already exists with the specified email**
  * **Status Code:** 500
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```
* **Error Response: User already exists with the specified username**
  * **Status Code:** 500
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```
* **Error Response: Body validation errors**
  * **Status Code:** 400
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

