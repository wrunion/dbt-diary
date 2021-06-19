## HT Admin Panel/Backend

**This code is a starter point for building out the functionality of the Healthy Transitions Backend Admin Panel.**

This site will eventually allow users to:
- Upload a CSV with listing data
- See data validation errors 
- Preview the site with their preview data
- Update the live site

Behind the scenes it will: 
- Accept a CSV file upload
- Check the CSV values against a pre-determined JSON schema
- Return data validiation errors to users, along with instructions on how to troubleshoot said errors
- Return a link for users to view a "preview" version of the site
- Allow the users to update the live Healthy Transitions site

### Local setup: 
- Git clone this repo
- cd into the folder and run ```npm install```
- Install nodemon globally and run ```nodemon server```
**or** run ```npm install --save-dev nodemon```, and then ```nodemon server```
- You can also start the repo with ```node server```, but nodemon will restart the server as you make changes in your code file; using only "node" will not. 

### Login
- For now there's only dummy logic, that relies on a certain string being typed into the text box. 
- It's already provied for you, so just press "login" to see the rest of the Admin Panel

Dev note: There is currently no working login or auth in this code. _**Before production, use Passport.js or express-sessions to protect all routes other than login.**_

### Questions? 
PM Winter on Slack