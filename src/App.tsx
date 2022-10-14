import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch } from 'react-redux';
import { USER_TYPE } from './store/UserReducer';
import UserDisplay from './UserDisplay';
function App() {
  const [userid, setUserid] = useState (0);
  const dispatch = useDispatch();

  const onChangeUserId = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const useridFromInput = e.target.value ? Number(e.target.value) : 0;
    console.log("userid", useridFromInput);
    setUserid(useridFromInput);

    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    console.log("Response", usersResponse);

    if(usersResponse.ok){
      const users = await usersResponse.json()
      console.log("users", users);
      const usr = users.find((userItem:any) => {
        return userItem && userItem.id === useridFromInput;
      });
      console.log("usr", usr);
      dispatch({
        type: USER_TYPE,
        payload: {
          id:usr.id,
          username:usr.username,
          email: usr.email,
          city: usr.address.city
        }
      });
    }
    
  }
  return (
    <>
       <div className="App">
        <label>user id</label>
        <input  onChange={onChangeUserId} />
      </div>
      <UserDisplay />
    </>

  );
}

export default App;
