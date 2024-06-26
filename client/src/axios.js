import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://www.sukisushi.works',
})

export default Api