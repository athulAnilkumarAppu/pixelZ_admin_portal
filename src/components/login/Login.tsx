

import {useState } from "react";

import {useNavigate} from 'react-router-dom'

import { toast } from 'react-toastify';
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };



  const onLoginClick = async () => {
    const params = {username: username, password: password}
    await axios.post('http://localhost:3000/login', params).then((response: any)=> {
      
        if(response.data.status === 'success'){
            navigate('/adminPage')
        }else if(response.data.status === 'unauthorized'){
            toast.error('Invalid username or password') 
        }
    }).catch(()=> {
        toast.error('Login error')
    })
  };


  return (
    <>
      <h1 style={{ textAlign: "center", color: "#3498db" }}>
        Admin Portal
      </h1>

      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#2c3e50" }}>Login</h3>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ margin: "8px 0", color: "#7f8c8d" }}>
            Email Id/Username
          </label>
          <input
            type="text"
            onChange={(e: any) => onUsernameChange(e)}
            value={username}
            style={{
              padding: "10px",
              margin: "8px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <label style={{ margin: "8px 0", color: "#7f8c8d" }}>Password</label>
          <input
            type="password"
            onChange={(e: any) => onPasswordChange(e)}
            value={password}
            style={{
              padding: "10px",
              margin: "8px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={() => onLoginClick()}
            style={{
              backgroundColor: "#3498db",
              color: "#fff",
              padding: "10px",
              borderRadius: "4px",
              cursor: "pointer",
              border: "none",
            }}
          >
            LOGIN
          </button>
          
          
        </div>
      </div>
    </>
  );
};

export default Login;
