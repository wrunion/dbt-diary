## Developer TODO List

A centralized list of features that we still need to implement, roughly organized by which Route/EJS file they are most related to. 


#### **Note: This is NOT a task board. Dev tasks are managed by the Github project board in the "healthy-transitions-backend" repo.** 

#### If you're interested in a task on this list, turn it into a Github issue (if it isn't already) **and have it approved by Elle.** 

#### Then, assign the Github issue to yourself and move it to the "In Progress" column on the Github project board. 

_Again, is a list for brainstorming and notes. Feel free to add items (or check them off as they're completed) but this **isn't** a task tracker. Just a place to put notes while I clean up the code._


### Route/View: Upload
1. Accept a CSV upload from user
1. Convert the CSV into JSON, using Node 
    1. There are Node packages that may help with this, such as csvtojson
1. Validate the JSON data against a specific JSON schema, provided by Elle.
1. Pass any data validation errors to the server, so they can be displayed to the user

**Then:**
1. If JSON had been validated and is ready to be stored in Postgres, put the JSON into Postgres

1. Send the validated JSON to the FE via a single API endpoint

_Note: more information from Elle is needed for this._

### Route/View: Update

1. Display button to update the live site
1. Update the live site onclick, and return a sucesss or failure message
1. If the updated failed, offer detailed troubleshooting steps.

### Route/View: Update

1. Display a link to the preview site with the updated data 
1. Show a div with data validation errors and instrutions to rectify them
