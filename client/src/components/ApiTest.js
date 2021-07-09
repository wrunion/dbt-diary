import React from 'react'
// import * as api from './../api'


const postDay = () => {

  const data = {
    "suicideUrge": '0', "selfHarmUrge": '0', "drugUrge": '0', "emotionalMisery": '0', "physicalMisery": '0', "joy": '0', "gratitude": '0', "calm": '0', "intentionality" : '0'
  }

  fetch('api/day', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json()).then(json => console.log(json)).catch(err => console.log(err))
}


const CreateDay = () => {

  return(
    <div>

      <button onClick={() => postDay()}>Click here to test Post route</button>

    </div>
  )
}

export default CreateDay

// class MovieList extends React.Component {
//   state ={
//     movies: []
//   }

  // fetchAll = async () => {
  //   const res = await fetch('api/movies');
  //   const data = await res.json()
  //   // console.log(movies)
  //   console.log(data.data)
  //   this.setState({ movies: data.data })
  // }

  // componentDidMount() {
  //   const getData = async () => {
  //     const response = await fetch('api/movies');
  //     const data = await response.json()
  //     // console.log(movies)
  //     console.log('data from fetch', data.data)
  //     this.setState({ movies: data.data })
  //     console.log('state', this.state)
  //   }
  //   getData();
  // }



//   async postToDay() {

//     fetch('api/day', {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(testData)
//     }).then(res => res.json()).then(json => console.log(json)).catch(err => console.log(err))
//   }

//   render() {

//     return(
//       <div>

//        <button onClick={this.postToDay}>Click here to test Post route</button>

//       </div>
//     )
//   } 
// }


// const ApiTest = () => {
//   console.log(api)
//   return(
//     <div>
//       ApiTest
//     </div>
//   )
// }

// export default ApiTest;