import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate(); // Sử dụng hook để điều hướng

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage('Đăng nhập thành công');
        setTimeout(() => {
          navigate('/attendance'); // Chuyển hướng đến trang Attendance
        }, 1000); // Đợi 1 giây để hiển thị thông báo
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message || 'Đăng nhập thất bại');
      } else {
        setMessage('Lỗi kết nối đến server');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Human Resource</h1>
      <h1 style={styles.header}>Information Management System</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={styles.input} 
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input} 
            required
          />
        </div>
        <button type="submit" style={styles.button}>Đăng nhập</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Đảm bảo kiểu cho styles là CSSProperties với flexDirection hợp lệ
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(to right, #1E3A8A, #2563EB)', // Gradient background
    margin: 0,
    padding: 0,
    flexDirection: 'column' as 'column', // Đảm bảo kiểu cho flexDirection
  },
  header: {
    fontSize: '36px',
    color: '#fff',
    marginBottom: '40px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column', // Đảm bảo kiểu cho flexDirection
    alignItems: 'center',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  inputGroup: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '16px',
    color: '#333',
  },
  input: {
    padding: '8px',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    color: 'red',
    fontSize: '16px',
  },
};

export default Login;
