import axios from 'axios';

export const buscarEndereco = axios.create({
  baseURL: `https://viacep.com.br/ws/`
})
export const heroku = axios.create({
  baseURL: 'https://docedelicia.herokuapp.com/api/'
})
