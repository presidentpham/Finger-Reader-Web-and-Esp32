#include <WiFi.h>
#include <Wire.h>
#include <HTTPClient.h>

// Thông tin Wi-Fi của bạn
const char* ssid = "MrStrixX";
const char* password = "12345678";

// Biến nhận dữ liệu
char receivedChar;
uint8_t receivedID;

void setup() {
  Serial.begin(115200);  // Khởi tạo Serial để in thông tin ra monitor
  Wire.begin(8);  // Địa chỉ ESP32 trên bus I2C (slave)
  Wire.onReceive(receiveData);  // Đăng ký hàm xử lý khi nhận dữ liệu từ I2C

  // Kết nối Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  if (receivedID != 0) {
    Serial.print("Received ID: ");
    Serial.println(receivedID);  // In ID nhận được
    if (receivedChar == 'D') {
      sendToAttendance(receivedID);  // Gửi vào bảng attendance
    } else if (receivedChar == 'E') {
      sendToUsers(receivedID);  // Gửi vào bảng users
    }
    receivedID = 0;  // Reset sau khi đã nhận và xử lý
  }
}

// Hàm lắng nghe và nhận dữ liệu từ I2C
void receiveData(int byteCount) {
  while (Wire.available()) {
    receivedChar = Wire.read();  // Nhận ký tự từ Arduino Nano
    if (receivedChar == 'D' || receivedChar == 'E') {
      receivedID = Wire.read();  // Nhận ID tiếp theo
    }
  }
}

// Hàm gửi ID vào bảng attendance
void sendToAttendance(uint8_t id) {
  HTTPClient http;
  String serverPath = "http://172.20.10.2/phpFingerprint/insert_attendance.php?id=" + String(id);
  
  http.begin(serverPath);  // Bắt đầu HTTP request
  int httpResponseCode = http.GET();  // Gửi GET request

  if (httpResponseCode == 200) {
    Serial.println("ID sent to attendance table successfully!");
  } else {
    Serial.print("Error sending ID to attendance table, response code: ");
    Serial.println(httpResponseCode);
  }

  http.end();  // Kết thúc HTTP request
}

// Hàm gửi ID vào bảng users
void sendToUsers(uint8_t id) {
  HTTPClient http;
  String serverPath = "http://172.20.10.2/phpFingerprint/insert_users.php?id=" + String(id);
  
  http.begin(serverPath);  // Bắt đầu HTTP request
  int httpResponseCode = http.GET();  // Gửi GET request

  if (httpResponseCode == 200) {
    Serial.println("ID sent to users table successfully!");
  } else {
    Serial.print("Error sending ID to users table, response code: ");
    Serial.println(httpResponseCode);
  }

  http.end();  // Kết thúc HTTP request
}
