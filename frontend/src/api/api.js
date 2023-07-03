import axios from 'axios';

const cabAppUrl = "http://localhost:9000"
const driverAppUrl = "http://localhost:8080"
const cabDriverAppUrl = "http://localhost:5000"


export const fetchDrivers = () => {
    return axios.get(`${driverAppUrl}/drivers`)
}

export const fetchDriver = (id) => {
    console.log(`${driverAppUrl}/drivers/${id}`)
    return axios.get(`${driverAppUrl}/drivers/${id}`)
}

export const createDriver = (data) => {
    return axios.post(`${driverAppUrl}/drivers`, data)
}

export const updateDriver = (id,data) => {
    return axios.put(`${driverAppUrl}/drivers/${id}`, data)
}

export const deleteDriver = (id) => {
    return axios.delete(`${driverAppUrl}/drivers/${id}`)
}