import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://www.sukisuhi.works',
})

export default Api