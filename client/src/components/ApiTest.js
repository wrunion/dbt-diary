import React from 'react'
// import * as api from './../api'

export default class MovieList extends React.Component {
  state ={
    movies: []
  }

  fetchAll = async () => {
    const movies = await fetch('api/movies');
    const data = await movies.json()
    // console.log(movies)
    console.log(data.data)
  }

  render() {
    const movies = this.state;
    this.fetchAll()

    if (movies) {
    return(
      <div>
        Movies here
      </div>
    ) 
  } else { return null }
}
}


// const ApiTest = () => {
//   console.log(api)
//   return(
//     <div>
//       ApiTest
//     </div>
//   )
// }

// export default ApiTest;