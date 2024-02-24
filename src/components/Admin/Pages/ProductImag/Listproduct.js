import React, { useEffect, useState } from 'react';
import { getProductsApi } from '../../../../api/ProductImage';
import { Link } from 'react-router-dom';


const ProductImages = () => {
  const [ProductImage, setProductTypes] = useState([]);
  var URL = 'https://localhost:7225/images/';
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (id) => {
    try {
      const response = await getProductsApi();
      setProductTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='scrollable-container'>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>ProductId</th>
            <th>image</th>
            <th>image</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {ProductImage.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.productId}</td>
              <td>{p.imagepath}</td>

              <div className="row"> <img src={URL + p.imagepath} alt="Example Image" /></div>
              <div className="row">


              </div>
              <td>
                <Link to={`edit/${p.id}`}>Edit</Link> |{''}
                <a href={`details/${p.id}`}>Details</a> |
                <a href={`delete/${p.id}`}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductImages;