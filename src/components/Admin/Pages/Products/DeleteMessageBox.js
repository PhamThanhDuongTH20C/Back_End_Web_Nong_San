import React, { useState } from 'react';

const DeleteMessageBox = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete(); // Gọi hàm xóa khi người dùng xác nhận
    setIsOpen(false); // Đóng message box
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Xóa</button>
      {isOpen && (
        <div className="message-box">
          <p>Bạn có chắc chắn muốn xóa không?</p>
          <button onClick={handleDelete}>Xóa</button>
          <button onClick={() => setIsOpen(false)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default DeleteMessageBox;
