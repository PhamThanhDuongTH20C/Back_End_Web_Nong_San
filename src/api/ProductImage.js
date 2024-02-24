import axios from 'axios';

const API_URL = 'https://localhost:7225/api/ProductImages';
const IMG_URL='https://localhost:7225/api/ProductImages/api/productimages/'; 
// GET: /api/Products
export const getProductsApiig = () => {
    return axios.get(API_URL);
};

// GET: /api/Products/{id}
export const getProductApiig = (id) => {
    return axios.get(`${API_URL}/${id}`);
  };
  export const getimgproid = (id) => {
    return axios.get(`${IMG_URL}/${id}`);
  };
  export const createProductss = (productType) => {
    return axios.post(API_URL, productType)
      .then(response => {
        console.log('Product type created:', response.data);
        return response.data; // Trả về dữ liệu sản phẩm đã tạo
      })
      .catch(error => {
        console.error('Failed to create product:', error);
        throw error; // Ném ra lỗi để hàm gọi xử lý
      });
  };
  export const createImg = (product) => {
    return axios.post(API_URL, product)
      .then(response => {
        console.log('Product type created:', response.data);
        return response.data; // Trả về dữ liệu sản phẩm đã tạo
      })
      .catch(error => {
        console.error('Failed to create product:', error);
        throw error; // Ném ra lỗi để hàm gọi xử lý
      });
  };
  export const deleteimg =(id) => {
    return axios.delete(`https://localhost:7225/api/ProductImages/${id}`)
    .then(response => {
      console.log('Product deleted successfully');
      // Handle the response or perform any necessary actions
    })
    .catch(error => {
      console.error('Error deleting product:', error);
      // Handle the error or display an error message
    });
};