import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000/instance',
})

export const insertMovie = payload => instance.post(`/movie`, payload)
export const getAllMovies = () => instance.get(`/movies`)
export const updateMovieById = (id, payload) => instance.put(`/movie/${id}`, payload)
export const deleteMovieById = id => instance.delete(`/movie/${id}`)
export const getMovieById = id => instance.get(`/movie/${id}`)

const api = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default api