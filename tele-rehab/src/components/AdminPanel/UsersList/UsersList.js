import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Link,
  Redirect
} from "react-router-dom";

const UsersList = () => {
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [file, setFile] = useState({});

  useEffect(() => {
    fetch(`https://api.tele-rehab.com.ua/users/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(async (res) => {
      let data = await res.json();
      setUsers(data);
    })
  }, [])

  const deleteUser = (id) => {
    fetch(`https://api.tele-rehab.com.ua/users/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => { return res.json() })
    .then(() => {
      fetch(`https://api.tele-rehab.com.ua/users/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(async (res) => {
        let data = await res.json();
        setUsers(data);
      })
    })
  }

  return (
    <div className="user-list">

      <div className="container">
        <div className="wrapper-user-list">
          {users.map(item => {
            return (
              <div className="user-admin-card" key={item._id}>
                <div className="user-name">{item.name}</div>
                <div className="user-link">
                  <Link to={{
                    pathname: "/chat",
                    userId: item._id,
                    userName: item.name,
                  }}>Начать видеозвонок</Link>
                </div>
                <div className="user-link" onClick={() => { deleteUser(item._id) }}>
                  Удалить пользователя                
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default UsersList;