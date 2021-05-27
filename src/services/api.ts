import axios from 'axios';

export const buscarEndereco = axios.create({
  baseURL: `https://viacep.com.br/ws/`
})
export const raspberry = axios.create({
  baseURL: 'http://docedelicia.ignorelist.com:8080/api/'
})
export const api1 = axios.create({
  baseURL: 'http://localhost:3333/'
})
