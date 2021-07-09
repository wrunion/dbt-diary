export const getRequest = (url) => fetch(url, {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => response.json()).then(json => console.log(json))

export const postRequest = async (url, data) => await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})

// import axios from 'axios'

// const api = axios.create({
//     baseURL: 'http://localhost:3000/api',
// })

// export const insertMovie = payload => api.post(`/movie`, payload)
// export const getAllMovies = () => api.get(`/movies`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

// const apis = {
//     insertMovie,
//     getAllMovies,
//     updateMovieById,
//     deleteMovieById,
//     getMovieById,
// }

// export default apis