import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/'  
})
export const buscarEndereco = axios.create({
  baseURL: `https://viacep.com.br/ws/`
})
export const api1 = axios.create({
  baseURL: 'http://docedelicia.ignorelist.com:8080/api/'
})
