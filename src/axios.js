import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://server.sukisuhi.works',
})

export default Api