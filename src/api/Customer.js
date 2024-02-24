import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/api/users/getall';

// GET: /api/Products
export const getCustomerApis = () => {
    return axios.get(API_URL);
};

// GET: /api/Products/{id}
export const getCustomerApi = (id) => {
    return axios.get(`${API_URL}/${id}`);
  };

  export const createCustomer = (product) => {
    return axios.post(API_URL, product)
      .then(response => {
        console.log('Product created:', response.data);
        return response.data; // Trả về dữ liệu sản phẩm đã tạo
      })
      .catch(error => {
        console.error('Failed to create product:', error);
        throw error; // Ném ra lỗi để hàm gọi xử lý
      });
  };
  export const createCustomers = (product) => {
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