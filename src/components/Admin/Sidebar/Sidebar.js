import React, { useState, useEffect } from 'react'
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import {
  AppstoreOutlined,
  UsergroupAddOutlined,
  ShopOutlined,
  OrderedListOutlined,
  WechatOutlined,
  SolutionOutlined,
  LogoutOutlined,
  TagOutlined,
  ProfileOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Trang Chủ');
  const location = useLocation();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin') {
      setActiveItem('Trang Chủ');
    } else if (path === '/admin/products/list') {
      setActiveItem('Sản Phẩm');
    } else if (path === '/admin/producttype') {
      setActiveItem('Loại Sản Phẩm');
    } else if (path === '/admin/promotion') {
      setActiveItem('Khuyến mãi');
    }
    else if (path === '/admin/customer') {
      setActiveItem('Khách Hàng');
    } else if (path === '/admin/order') {
      setActiveItem('Đơn Hàng');
    } else if (path === '/admin/supplier') {
      setActiveItem('Nhà cung cấp');
    } else if (path === '/admin/import-invoice') {
      setActiveItem('Hóa đơn nhập');
    } else {
      setActiveItem(null);
    }

  }, [location]);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
      <h2 style={{ fontWeight: 'bold', color: '#007bff', fontFamily: 'Arial, sans-serif' }}>Lưu Gia Admin</h2>
      </div>
      <div className="sidebar-list">
        <Link
          to="/admin"
          className={`sidebar-list-item ${activeItem === 'Trang Chủ' ? 'active' : ''}`}
          onClick={() => handleItemClick('Trang Chủ')}
        >
          <span>
            <HomeOutlined />
          </span>
          <p>Trang Chủ</p>
        </Link>
        <Link
          to="/admin/products/list"
          className={`sidebar-list-item ${activeItem === 'Sản Phẩm' ? 'active' : ''}`}
          onClick={() => handleItemClick('Sản Phẩm')}
        >
          <span>
            <AppstoreOutlined />
          </span>
          <p>Sản Phẩm</p>
        </Link>
        <Link
          to="/admin/producttype"
          className={`sidebar-list-item ${activeItem === 'Loại Sản Phẩm' ? 'active' : ''}`}
          onClick={() => handleItemClick('Loại Sản Phẩm')}
        >
          <span>
            <UsergroupAddOutlined />
          </span>
          <p>Loại Sản Phẩm</p>
        </Link>
        <Link
          to="/admin/customer"
          className={`sidebar-list-item ${activeItem === 'Khách Hàng' ? 'active' : ''}`}
          onClick={() => handleItemClick('Khách Hàng')}
        >
          <span>
            <UsergroupAddOutlined />
          </span>
          <p>Khách Hàng</p>
        </Link>
        <Link
          to="/admin/order"
          className={`sidebar-list-item ${activeItem === 'Đơn Hàng' ? 'active' : ''}`}
          onClick={() => handleItemClick('Đơn Hàng')}
        >
          <span>
            <OrderedListOutlined />
          </span>
          <p>Đơn Hàng</p>
        </Link>
        <Link
          to="/admin/supplier"
          className={`sidebar-list-item ${activeItem === 'Nhà cung cấp' ? 'active' : ''}`}
          onClick={() => handleItemClick('Nhà cung cấp')}
        >
          <span>
            <SolutionOutlined />
          </span>
          <p>Nhà cung cấp</p>
        </Link>
        <Link className={'sidebar-list-item'} onClick={() => setShowConfirmationModal(true)}>
          <span>
            <LogoutOutlined />
          </span>
          <p>Đăng xuất</p>
        </Link>
        <Modal
          open={showConfirmationModal}
          onCancel={() => setShowConfirmationModal(false)}
          onOk={() => {
            localStorage.removeItem('accessToken');
            window.location.href = '/admin/login';
          }}
        >
          <p>Bạn có muốn đăng xuất không?</p>
        </Modal>
      </div>
    </div>
  )
}

export default Sidebar