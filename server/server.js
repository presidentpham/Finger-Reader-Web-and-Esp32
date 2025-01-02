const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Sử dụng bcrypt để mã hóa mật khẩu

const app = express();
const port = 5000;

// Cấu hình CORS để cho phép frontend kết nối từ domain khác
app.use(cors());

// Parse JSON request body
app.use(bodyParser.json());

// Cấu hình kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',    // Thay thế với thông tin kết nối của bạn
  user: 'root',         // Thay thế với tên người dùng MySQL
  password: '',         // Thay thế với mật khẩu MySQL
  database: 'fingerprint'  // Tên cơ sở dữ liệu của bạn
});

// Kiểm tra kết nối MySQL
db.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('Kết nối MySQL thành công');
});

// Định nghĩa route đăng nhập
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu MySQL
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error('Lỗi khi truy vấn dữ liệu:', err);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi truy vấn dữ liệu' });
      }

      // Nếu không tìm thấy người dùng
      if (results.length === 0) {
        return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu sai' });
      }

      // Kiểm tra mật khẩu
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);  // So sánh mật khẩu

      if (!match) {
        return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu sai' });
      }

      // Nếu đăng nhập thành công
      res.status(200).json({ message: 'Đăng nhập thành công' });
    });
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi trên server' });
  }
});
// Endpoint to add an employee
app.post('/employees', (req, res) => {
  const { name, age, phone, email, fingerprint } = req.body;

  const query = `INSERT INTO employee (name, age, phone_number, email, fingerprint_code)
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [name, age, phone, email, fingerprint], (err, result) => {
    if (err) {
      console.error('Error inserting employee:', err);
      res.status(500).json({ message: 'Failed to add employee' });
      return;
    }
    res.status(200).json({ message: 'Employee added successfully', id: result.insertId });
  });
});

// Endpoint lấy dữ liệu attendance và employee
app.get("/api/attendance", (req, res) => {
  const query = `
    SELECT 
      e.name, 
      e.age, 
      e.phone_number, 
      e.email, 
      a.fingerprint_code, 
      a.time AS checkin_time 
    FROM attendance a
    JOIN employee e ON a.fingerprint_code = e.fingerprint_code
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

// Bắt lỗi không tìm thấy route
app.use((req, res) => {
  res.status(404).json({ message: 'Route không hợp lệ' });
});


// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
