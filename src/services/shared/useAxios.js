import axios from 'axios'

const useAxios = () => {
  const baseUrl = 'http://localhost:8080/'

  const axiosInstance = axios.create({
    baseURL: baseUrl,
  })

  return axiosInstance
}

export default useAxios
