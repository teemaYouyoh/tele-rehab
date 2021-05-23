import React, { useEffect, useState } from 'react';
import CategoryList from './CategoryList/CategoryList';
import AppointmentsList from './AppointmentsList/AppointmentsList';

import './AdminPanel.css';

const AdminPanel = () => {

  const [selectedCategory, setSelectCategory] = useState(null);

  return (
    <div className="admin-panel">
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectCategory={setSelectCategory}
      />
      
      <AppointmentsList
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default AdminPanel;