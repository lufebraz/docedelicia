import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/'
})
export const buscarEndereco = axios.create({
  baseURL: `https://viacep.com.br/ws/`
})
