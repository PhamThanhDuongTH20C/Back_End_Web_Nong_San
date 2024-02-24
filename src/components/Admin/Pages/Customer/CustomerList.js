import { Link } from 'react-router-dom';
import { getCustomerApis } from '../../../../api/Customer';
import React, { useEffect, useState } from 'react';

const CustomerList = () => {
  const [User, setProductTypes] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (id) => {
    try {
      const response = await getCustomerApis();
      setProductTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='admin-product-list scrollable-container'>
      <table>
        <thead>
          <tr>
            <th Style={{width:'50px'}}>STT</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Tài Khoản</th>
          </tr>
        </thead>
        <tbody>

          {User.map((p, index) => (
            <tr key={p.id}>
              <td Style={{width:'50px'}}>{index + 1}</td>
              <td>{p.fullName}</td>
              <td>{p.email}</td>
              <td>{p.phoneNumber}</td>   
              <td>{p.isAdmin ? 'Admin' : 'Khách Hàng'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerList