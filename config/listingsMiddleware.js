const db = require('./../db')

/* postgresql table for reference only:

DROP TABLE IF EXISTS listings;
CREATE TABLE listings (
  id VARCHAR(256) PRIMARY KEY NOT NULL,
  name VARCHAR(256) NOT NULL,
  category VARCHAR(256) NOT NULL,
  website VARCHAR(256),
  street_address VARCHAR(256)
);

*/

const validatedJsonData = {
  "listings": {
    "1": {
      "listingId": "1",
      "name": "Name 1",
      "category": "Category 1",
      "website": "www.website1.com",
      "streetAddress": "123 Sesame Street"
    },
    "2": {
      "listingId": "2",
      "name": "Name 2",
      "category": "Category 2",
      "website": "www.website2.com",
      "streetAddress": "123 Sesame Street"
    },
    "3": {
      "listingId": "3",
      "name": "Name 3",
      "category": "Category 3",
      "website": "www.website3.com",
      "streetAddress": "123 Sesame Street"
    },
    "4": {
      "listingId": "4",
      "name": "Name 4",
      "category": "Category 4",
      "website": "www.website4.com",
      "streetAddress": "123 Sesame Street"
    }
  }
}

/* 
 * IF TABLE SCHEMA CHANGES
 * CHANGE IT HERE
*/
const dropTableString = `DROP TABLE IF EXISTS listings`
const createListingsTableString = `CREATE TABLE listings (
  id VARCHAR(256) PRIMARY KEY NOT NULL,
  name VARCHAR(256) NOT NULL,
  category VARCHAR(256) NOT NULL,
  website VARCHAR(256),
  street_address VARCHAR(256)
);`

const listings = validatedJsonData.listings;

const createListingsTable = async () => {
  try {
    await db.query(dropTableString)
    await db.query(createListingsTableString)
    // if the code has reached this point, 
    // database calls were successful
    return(true)
  } catch (err) {
    console.log('create listings error: ' + err)
    return err.message;
    // TODO: if this is used in a route, call next(error) here 
  }
}

const jsonToPostgres = async () => {
  try {
    Object.entries(listings).forEach((listing) => {
      const [key, vals] = listing;
      const { listingId, name, category, website, streetAddress } = vals;
      // we don't have to specify column names 
      // as long as we provide the arguments in the same order as the columns
      // and in a 1-to-1 ratio
      db.query('INSERT INTO listings VALUES ($1, $2, $3, $4, $5)',
      [listingId, name, category, website, streetAddress], (err, res) => {
        if (err) { console.log(listingId, err.message); return; }
        // if there's no error, our call was successful
        // continue on to the next listing
        next();
      })
    });
    return true;
  } catch (error) {
    console.log('json to postgres error: ' + err)
    return err.message;
  }
}

module.exports = {

  validatedJsonData: {
    "listings": {
      "1": {
        "listingId": "1",
        "name": "Name 1",
        "category": "Category 1",
        "website": "www.website1.com",
        "streetAddress": "123 Sesame Street"
      },
      "2": {
        "listingId": "2",
        "name": "Name 2",
        "category": "Category 2",
        "website": "www.website2.com",
        "streetAddress": "123 Sesame Street"
      },
      "3": {
        "listingId": "3",
        "name": "Name 3",
        "category": "Category 3",
        "website": "www.website3.com",
        "streetAddress": "123 Sesame Street"
      },
      "4": {
        "listingId": "4",
        "name": "Name 4",
        "category": "Category 4",
        "website": "www.website4.com",
        "streetAddress": "123 Sesame Street"
      }
    }
  },
  listings: validatedJsonData.listings,
  listingsToPostgres: (listings) => jsonToPostgres(listings),
  createListingsTable: () => createListingsTable()
}