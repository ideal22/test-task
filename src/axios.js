import axios from 'axios'

let instance = axios.create({
  baseURL: 'https://api.exchangeratesapi.io',
})

export default instance
