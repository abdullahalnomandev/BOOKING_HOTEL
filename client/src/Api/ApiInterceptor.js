import  axios  from 'axios';
import { API_BASE_URL } from './ApiConstant';

export const API = axios.create({baseURL:API_BASE_URL})


