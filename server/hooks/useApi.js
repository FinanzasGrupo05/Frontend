import useAxios from "./useAxios";

const useApi = (endpoint) => {

    const axiosInstance = useAxios();

    const getObjects = () => {
        return axiosInstance
            .get(endpoint)
            .then(res => res.data);
    }

    const getObjectById = (id) => {
        return axiosInstance
            .get(`${endpoint}/${id}`)
            .then(res => res.data);
    }

    const postObject = (object) => {
        return axiosInstance
            .post(endpoint, object)
            .then(res => res.data);
    }

    const putObject = (id,object) => {
        return axiosInstance
            .put(`${endpoint}?id=${id}`, object)
            .then(res => res.data)
    }

    const deleteObjectById = (id) => {
        return axiosInstance
            .delete(`${endpoint}/${id}`)
            .then(res => res.data);
    }

    return { getObjects, getObjectById, deleteObjectById, postObject, putObject }
}

export default useApi;