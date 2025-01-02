#include <Wire.h>

char receivedChar;
uint8_t receivedID;

void setup() {
  Serial.begin(115200);  // Khởi tạo Serial để in thông tin ra monitor
  Wire.begin(8);  // Địa chỉ ESP32 trên bus I2C (slave)
  Wire.onReceive(receiveData);  // Đăng ký hàm xử lý khi nhận dữ liệu từ I2C
  Serial.println("ESP32 Ready to receive data...");
}

void loop() {
  // Đọc và hiển thị dữ liệu nếu đã nhận
  if (receivedID != 0) {
    Serial.print("Received ID: ");
    Serial.println(receivedID);  // In ID nhận được
    receivedID = 0;  // Reset sau khi đã nhận và hiển thị
  }
}

// Hàm lắng nghe và nhận dữ liệu từ I2C
void receiveData(int byteCount) {
  while (Wire.available()) {
    receivedChar = Wire.read();  // Nhận ký tự từ Arduino Nano
    if (receivedChar == 'D') {   // Kiểm tra nếu nhận 'D'
      receivedID = Wire.read();  // Nhận ID tiếp theo
    }
    if (receivedChar == 'E') {
      receivedID = Wire.read();
    }
  }
}
