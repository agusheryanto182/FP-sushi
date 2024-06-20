import Api from '../axios';
import axios from '../axios';
export const getMenuItems = async () => {
    try {
        const response = await axios.get('/api/v1/product');
        const baseURL = Api.defaults.baseURL;
        return response.data.data.map(item => ({
            id: item._id,
            name: item.name,
            category: item.category,
            price: item.price,
            imageUrl: `${baseURL}/${item.imageUrl}`,
            checkoutUrl: '/checkout'
        }))
    } catch (error) {
        console.error('Error fetching menu items:', error)
        throw error
    }
}