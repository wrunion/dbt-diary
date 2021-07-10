export const createNewEntry = ({ data, type }) => {
  // structure the request 
  // in the format the server expects
  const req = { json: data, type: type }
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