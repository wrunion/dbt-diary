## Healthy Transitions Admin Panel
**An Admin Panel for Healthy Transitions Oregon/The Oregon Youth Resource Map that allows Healthy Transitions staff to update their site data in real time.**

_Note: this code and doesn't interact with the Healthy Transtions Frontend. They serve two very different functions, and don't rely on each other at run time_

You can find the [Healthy Transitions Frontend repo here](https://github.com/mapping-action-collective/healthy-transitions-frontend)

**This site allows authorized users to:** 
- Upload a CSV with map data
- See data validation errors 
- Preview the site with their uploaded data
- Update the live site

**Behind the scenes it will:**
- Accept a CSV file upload
- Check the CSV values against a pre-determined JSON schema
- Return data validiation errors to users, along with instructions on how to troubleshoot said errors
- Return a link for users to view a "preview" version of the site
- Allow the users to update the live Healthy Transitions site

### Local setup: 
1. Clone this repo to your local machine:

    ```git clone https://github.com/mapping-action-collective/healthy-transitions-backend.git```
1. Install npm modules

    ```cd healthy-transitions-backend```
  
    ```npm install```

1. Start the local development server

    ```npm start```

    _Note: the server runs on localhost:5050 by default_

### Login
- For now there's only dummy logic, that relies on a certain string being typed into the text box. 
- It's already provied for you, so just press "login" to see the rest of the Admin Panel

Dev note: There is currently no working login or auth in this code. _**Before production, middleware to protect all routes other than login.**_

### Questions? 
PM Winter on Slack