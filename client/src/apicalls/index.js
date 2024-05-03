import axios from 'axios';

export const axiosInstance = axios.create({

    headers:{
        creadentials:"include",
        'Content-Type':'application/json',
        Authorization:`Bearer ${localStorage.getItem('jwt')}`
    }
})


