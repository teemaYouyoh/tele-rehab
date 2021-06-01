import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Link,
  Redirect
} from "react-router-dom";

const UsersList = () => {
  const history = useHistory();

  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const response = await fetch(`http://localhost:3000/users/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let data = await response.json();

    setUsers(data);
  }, [])

  // const startVideoChat = (id) => {
  //   console.log(id)
  //   history.push({
  //     pathname: '/chat',
  //     userId: id
  //   });
  // }


  return (
    <div>
      {users.map(item => {
        return (
          <div key={item._id}>
            <div>{item.name}</div>
            <div>
              <Link to={{
                pathname: "/chat",
                userId: item._id,
              }}>Ссылка</Link>
            </div>
            {/* <div onClick={() => { startVideoChat(item._id) }}>Пригласить в видео-чат</div> */}
          </div>
        )
      })}
    </div>
  );
};

export default UsersList;