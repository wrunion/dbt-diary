### About This Repo: Touring the file tree

Because Express is lightweight and flexible - intentionally so - there aren't many universal standards on how to set up directory and project structures. 

In setting up this repository, I followed what Express conventions I could find, and cobbled together several different code styles to create the most straightforward file tree that I could. 

Each folder is clearly labeled by its purpose, and I used the "what you see is what you get" approach. For example, the database config is in a folder called "db," the routes are in "routes," the views are in "views." 

That being said, Express leaves a lot up to individual interpretation, so a lot of the code organization, file naming, and variable naming conventions in this repo are primarily judgement calls on my part.

Below you'll find an explanation of each file and folder. Feel free to ask me (Winter) if you have more questions, or if anything is unclear! 

### Views folder

**Terms**
- "EJS": Embedded JavaScript 
- "Views": Express's term for the code that is rendered to the user. In other applications, it's more often called the UI, the client, or the front end. 
    - But "views" are, specifically in the Express context, .ejs files that render html.
- "View engine": the technology that enables Express to render views via Express's various routes

**The "views" folder holds all EJS (Embedded Javascript) templates.**

On line 16 of server.js we declare that we're using ejs like so: 

```app.set('view engine', 'ejs');```

Once we do that, Express will automatically look for a "views" folder, and will render our view templates from there. 

_Side note: Express can alternately be configured with any one of several other view engine options, such as Pug, Jade, or Handlebars._ 

_EJS is preferred for our purposes, since it's syntax relies most closely on standard html, instead of arbitrary spacing or punctuation, like some of the other engines do._

### Routes folder
For ease of development, I split the routes into three main categories: 
1. All get requests (routes/index.js)
2. Logic dealing with user authentication (routes/user.js)
3. Logic dealing with listings (routes/listings.js)

Listings.js will contain logic to accept CSV uploads, work with the CSV data, etc. Whenever a user triggers an action from a /listings subroute, that call will be handled here. 

User.js contains logic to authenticate and add users 

Index.js is for rendering all GET requests - ie rendering the routes themselves. It uses a single piece of complex logic that it imports from authMiddleware: isLoggedIn, which is a function to protect routes from unauthorized users. 

### Middleware folder

A place for setting up custom middleware. We will probably use it often.

### Utils folder

Functions that are used often elsewhere. If a function is being called more than once in the app, it should probably be declared here, then exported and called, so that we don't duplicate code. 

_This is especially important in the case of authentication helper functions, as we want to have our logic consolidated in a single place. Only make changes here, and then call them elsewhere, instead of creating duplicate functions in a smaller scope._

### js folder

A placeholder. Will be pruned and turned into a public folder for serving static assets. 

### db folder: index.js

db/index.js holds the basic database configuration and connection. In that file, we create a Postgres "pool" using the pg node module. 

Then, we create a "query" function that lets us access the pool, and _we export that function and use it elsewhere, in any and all other places that we need to interact with the db._

Again, if you need to interact with the database, just require this folder like so: 

```const db = require('./../db')``` 
(Change the import path as needed.)

Once you've done that, you have access to the ```db.query(queryString, queryVals)``` function. 

Here's an example query: 
```const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);```

See utils/authUtils and middleware/authMiddleware for more examples, and to see it in action! 

### db folder: db.sql

**It's important to note that _this file does not automatically run anything._ There are ways to programmatically create tables from within a Node application; this isn't it.

This file is simply a way for devs to keep track of the schema they're currently using. All commands here must be executed manually using the psql command line, or a Postgres GUI of your choosing. 

This file is essentially a "receipt" of the tables we've built; notes-to-self to look back on.

Eventually, this file will be replaced by a dynamic table-creation process, probably invoked by a Heroku postbuild script in package.json. 

TODO: Discuss this more with Elle.

### Uploads folder 

This folder is automatically created by the Node module we're using to accept and parse CSV data: multer. On line 3 of routes/listings.js you can see the module being imported and configured. 

It's used in the '/listings/upload' POST route to accept CSVs and read them from the req.files object. (Line 9.)

Currently, there's just placeholder logic in place - it accepts the CSV, and console.logs the meta data. Next steps will involve parsing the CSV. 

This folder is where the uploaded files will be temporarily stored. 

### server.js file

Server.js is the entry point to the entire application. Some people also title this index.js

When the server starts, Node will execute this file from top to bottom. Any and all code that we want to run, needs to be called or referenced here. 

At the top of the file, we require the modules we need. Then we configure the middleware, starting in line 19. After that, we import the routes.

**Note: the order that you import and call middleware in matters. See the Express documentation for more detail if needed. But it can cause major bugs if you don't import & call the middleware in the correct order.**

### FAQ

Q: What's the difference between the "utils" and "middleware" folders? They both contain functions that are imported and invoked elsewhere; why are they categorized separately? 

A: This is where judgement calls come in. I needed to organize the code _somehow_ so I picked something logical but arbitrary.

I chose to distinguish between "utils" and "middleware" like this: 
- If it's a small helper function that only does a single task, and is only ever invoked by middleware, it's a util. 
- If it's meant to be invoked directly by a route, it's middleware
- tl; dr middleware is for more "complete" functions, that are ready to go as is; utils are for smaller functions that will eventually get built up into bigger ones. 
- This might seem like an obvious difference, but since nearly everything in Express is technically middleware, it's a good distinction to make.

If people have other conventions for organizing the code, I'm all ears! Especially if there are accepted best practices for this type of thing! 

