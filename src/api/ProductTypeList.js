import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/api/categories/getall';

// GET: /api/ProductTypes
export const getProductTypesApi = () => {
  return axios.get(API_URL);
};

// GET: /api/ProductTypes/{id}
export const getProductTypeApi = (id) => {
  
  return axios.get(`http://127.0.0.1:5001/api/categories/getid/${id}`);
};

// POST: /api/ProductTypes
export const createProductTypeApi = (productType) => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  return axios.post("http://127.0.0.1:5001/api/categories/create", productType,config)
    .then(response => {
     
      return response.data; 
    })
    .catch(error => {

      throw error; 
    });
};

// PUT: /api/ProductTypes/{id}
export const updateProductTypeApi = (id, productType) => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  return axios.put(`http://127.0.0.1:5001/api/categories/updateCategoryById/${id}`, productType,config);
};

// DELETE: /api/ProductTypes/{id}
export const deleteProductTypeApi = (id) => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  return axios.delete(`http://127.0.0.1:5001/api/categories/deleteCategoryById/${id}`,config);
  
};
