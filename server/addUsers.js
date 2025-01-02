const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Cấu hình kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fingerprint'
});

// Kết nối MySQL
db.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('Kết nối MySQL thành công');
});

// Hàm thêm người dùng
async function addUser(username, plainPassword) {
  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Thêm người dùng vào bảng users
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Lỗi khi thêm người dùng:', err);
        return;
      }
      console.log('Người dùng đã được thêm thành công:', result);

      // Đóng kết nối sau khi hoàn tất thêm người dùng
      db.end((endErr) => {
        if (endErr) {
          console.error('Lỗi khi đóng kết nối:', endErr);
          return;
        }
        console.log('Kết nối MySQL đã đóng');
      });
    });
  } catch (error) {
    console.error('Lỗi khi mã hóa mật khẩu:', error);
  }
}

// Gọi hàm để thêm người dùng
addUser('thangbq2', '123456');
