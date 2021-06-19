### HT Admin Panel/Backend

#### Note: this repo is currently just a bare-bones skeleton of the RCR Admin Panel. More features to come

This code is a starter point for building out the functionality of the Healthy Transitions Backend Admin Panel.

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

Dev note: There is currently no working login or auth in this code. _**Before production, use Passport.js or express-sessions to protect all routes other than login.**_