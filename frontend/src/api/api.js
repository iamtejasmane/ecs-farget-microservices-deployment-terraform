import axios from "axios"

const cabAppUrl = process.env.REACT_APP_CAB_APP
const driverAppUrl = process.env.REACT_APP_DRIVER_APP 
const cabDriverAppUrl = process.env.REACT_APP_CAB_ASSIGNMENT_APP

export const loginOwner = (data) => {
  return axios.post(`${driverAppUrl}/owner/login`, data)
}  

export const fetchDrivers = () => {
  return axios.get(`${driverAppUrl}/drivers`)
}

export const fetchDriver = (id) => {
  return axios.get(`${driverAppUrl}/drivers/${id}`)
}

export const createDriver = (data) => {
  return axios.post(`${driverAppUrl}/drivers`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateDriver = (id, data) => {
  return axios.put(`${driverAppUrl}/drivers/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
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
    return axios.post(`${cabAppUrl}/cabs`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
}

export const updateCab = (id,data) => {
    return axios.put(`${cabAppUrl}/cabs/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
}

export const deleteCab = (id) => {
    return axios.delete(`${cabAppUrl}/cabs/${id}`)
}

export const fetchCabDrivers = async () => {
  return axios.get(`${cabDriverAppUrl}/assignments`)
}

export const assignCabDriver = (data) => {
  return axios.post(`${cabDriverAppUrl}/assignments`, data)
}

export const updateCabDriverAssignment = (id,data) => {
  return axios.get(`${cabDriverAppUrl}/assignments/${id}`, data)
}

export const deleteCabDriverAssignment = (id) => {
  return axios.get(`${cabDriverAppUrl}/assignments/${id}`)
}