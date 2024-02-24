import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Products from './Pages/Products/ProductsList';
import AdminProduct from './Pages/Products/AdminProduct';
import CreateProducts from './Pages/Products/Createproducts';
import EditProduct from './Pages/Products/EditProduct';
import AdminProductType from './Pages/ProductType/AdminProductType';
import CreateProductType from './Pages/ProductType/CreateProductType';
import EditProductType from './Pages/ProductType/EditProductType';
import Sidebar from './Sidebar/Sidebar';
import AdminCustomer from './Pages/Customer/AdminCustomer';
import AdminOrder from './Pages/Order/AdminOder';
import Oderdetail from './Pages/Order/Oderdetail';
import Supplier from './Pages/Supplier/Supplier';
import SupplierCreate from './Pages/Supplier/SupplierCreate';
import SupplierEdit from './Pages/Supplier/SupplierEdit';
import OrderEdit from './Pages/Order/OrderEdit';
import DeleteMessageBox from './Pages/ProductType/DeleteMessageBox';
const Admin = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__content">
        <div className="layout__content-main">
          <Routes>
            {/* Trang chủ */}
            <Route path="/" index element={<Dashboard />} />
            {/* Sản phẩm */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/list" element={<AdminProduct />} />
            <Route path="/products/create" element={<CreateProducts />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            {/* Loại sản phẩm */}
            <Route path="/producttype" element={<AdminProductType />} />
            <Route path="/producttype/create" element={<CreateProductType />} />
            <Route path="/producttype/edit/:id" element={<EditProductType />} />
            <Route path='/producttype/delete/:id' element={<DeleteMessageBox />} />
            {/* Khách hàng */}
            <Route path="/customer" element={<AdminCustomer />} />
            {/* Đơn hàng */}
            <Route path="/order" element={<AdminOrder />} />
            <Route path="/order/detail/" element={<Oderdetail />} />
            <Route path="/order/update/" element={<OrderEdit />} />
            {/* Nhà cung cấp */}
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/supplier/create" element={<SupplierCreate />} />
            <Route path="/supplier/edit/" element={<SupplierEdit />} />
           
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
