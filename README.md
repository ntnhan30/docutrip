# MERN Project | Docutrip Fullstack Application

## Global information

### Directory structure

```
.vscode/
client/
  build/
  public/
  src/
  package.json
server/
  bin/
  configs/
  models/
  passport/
  routes/
  app.js
  middlewares.js
  package.json
.gitignore
package.json
README.md
```

### Files to add

You should have a `server/.env` file, with for example the following values:

```
CLOUDINARY_CLOUD_NAME=......
CLOUDINARY_API_KEY=......
CLOUDINARY_API_SECRET=......
JWT_SECRET=......
MONGODB_URI=......
```

## Commands

**To download the Docutrip**

$ git clone 

$ cd <my-project>
$ rm -rf .git
$ git init

# Set your GitHub repository as the "origin" remote repository
$ git remote add origin <https://github.com/user/my-project.git>
```

**To install all the packages**

```sh
$ npm install
# OR
$ (cd server && npm install)
$ (cd client && npm install)
```

**To install a package for the server**

```sh
$ cd server
$ npm install --save axios
```

**To install a package for the client**

```sh
$ cd client
$ npm install --save axios
```

**To run the server and the client**

```sh
# Open a first terminal
$ npm run dev:server
# Run the server on http://localhost:5000/

# Open a second terminal
$ npm run dev:client
# Run the client on http://localhost:3000/
```

So now you can go to

- http://localhost:5000/api/: A simple API call
- http://localhost:5000/: The website based on client/build (that you can update with `$ (cd client && npm run build)`)
- http://localhost:3000/: The last version of your React application that is calling your API with the base url "http://localhost:5000/api/"

## Example in the code

### `server/routes/auth.js`

- `router.post('/signup')`: Route to create a new user
- `router.post('/login')`: Route to send the user JWT
- `router.get('/secret')`: Route where the user need to be authenticated

### `server/routes/users.js`

- `router.get('/')`: Route to get all users
- `router.post('/first-user/pictures')`: Route to add a picture on one user with Cloudinary

<!-- TODO: give instructions for Cloudinary -->
<!-- TODO: give instructions for route guards -->

## Deployement on Heroku

### To deploy the first time

Create a project on Heroku.com. Here for the demo I named the project "my-ironhack-project".

Then, you need to link your Git project with Heroku.

```sh
# Replace "my-ironhack-project" by the name of your Heroku project
$ heroku git:remote -a my-ironhack-project
$ git push heroku master
```

Then you need to create a Mongo database online with MLab.

```sh
$ heroku addons:create mongolab:sandbox
```

### To redeploy

You just need to push on `heroku` (don't forget to commit before):

```sh
$ git push heroku master
```

### To execute a seed

If you want to execute something on the server, for example a seed, you can use `heroku run`.

Example:

```
$ heroku run node server/bin/seeds.js
```

### To Open MongoLab

You can either go on the Heroku project page ("Overview" tab) or type the following command:

```
$ heroku addons:open mongolab
```

### See the logs

```sh
$ heroku logs
```
