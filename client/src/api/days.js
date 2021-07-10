export const createRatingEntry = ({ input, successCb }) => {
  // grab vals from props
  const { date, data } = input;
  // structure the request 
  // in the format the server expects
  const req = { date: date, json: data }
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
    if (successCb) {
    // Show dimmer message
      successCb()
    } else {
      return true;
    }
  }).catch(err => {
    console.log(err); 
    return false
  }) 
}

export const createJournalEntry = (input) => {
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
    // if (successCb) {
    // // Show dimmer message
    //   successCb()
    // } else {
    //   return true;
    // }
    return true;
  }).catch(err => {
    console.log(err); 
    return false
  }) 
}