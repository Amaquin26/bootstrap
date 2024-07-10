import axios from 'axios'

const useAxiosFetch = () => {
    return axios.create({
        baseURL:'http://localhost:5000',
        withCredentials: true,
    })
}

export default useAxiosFetch;