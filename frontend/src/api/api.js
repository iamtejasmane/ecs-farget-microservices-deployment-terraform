import axios from "axios"

const cabAppUrl = process.env.CAB_APP || "http://localhost:4000"
const driverAppUrl = process.env.DRIVER_APP || "http://localhost:5000"
const cabDriverAppUrl =
  process.env.CAB_ASSIGNMENT_APP || "http://localhost:6000"

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

export const updateDriver = (id, data) => {
  return axios.put(`${driverAppUrl}/drivers/${id}`, data)
}

export const deleteDriver = (id) => {
  return axios.delete(`${driverAppUrl}/drivers/${id}`)
}


export const fetchCabs = () => {
    return axios.get(`${cabAppUrl}/cabs`)
}

export const fetchCab = (id) => {
    console.log(`${cabAppUrl}/cabs/${id}`)
    return axios.get(`${cabAppUrl}/cabs/${id}`)
}

export const createCab = (data) => {
    return axios.post(`${cabAppUrl}/cabs`, data)
}

export const updateCab = (id,data) => {
    return axios.put(`${cabAppUrl}/cabs/${id}`, data)
}

export const deleteCab = (id) => {
    return axios.delete(`${cabAppUrl}/cabs/${id}`)
}