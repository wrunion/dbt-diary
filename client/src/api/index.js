// export const getRequest = (url) => fetch(url, {
//   method: 'GET', // *GET, POST, PUT, DELETE, etc.
//   headers: {
//     'Content-Type': 'application/json'
//   }
// }).then(response => response.json()).then(json => console.log(json))

// export const postRequest = async (url, data) => await fetch(url, {
//   method: 'POST', // *GET, POST, PUT, DELETE, etc.
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// })

export const createNewEntry = (input) => {
  // grab vals from props
  const { date, data, type } = input;
  // structure the request 
  // in the format the server expects
  const req = { date: date, json: data, type: type }
  // this is specifically to create a day entry
  // for journal entries, see "createJournalEntry"
  fetch('api/day', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  }).then(res => res.json()).then(json => {
    console.log(json)
    return true;
  }).catch(err => {
    console.log(err); 
    return false
  }) 
}