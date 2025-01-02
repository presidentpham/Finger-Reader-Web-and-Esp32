#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>
#include "fingerprint_enrollment.h"
#include "fingerprint_detection.h"

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

SoftwareSerial mySerial(2, 3);  // TX/RX
// Khai báo đối tượng LCD
LiquidCrystal_I2C dis(0x27, 16, 2);

// Khai báo chân nút
const int buttonPin = 8; // Chân D10 của Arduino Nano

void setup() {
  // Khởi tạo màn hình LCD
  Wire.begin();
  Serial.begin(9600);
  dis.init();
  dis.begin(16, 2);
  dis.backlight();
  
  // Khởi tạo chân nút là đầu vào (kết nối GND khi nhấn)
  pinMode(buttonPin, INPUT_PULLUP);  // Sử dụng INPUT_PULLUP vì nút kéo xuống GND khi nhấn
  
}

void loop() {
  // Đọc trạng thái của nút (LOW khi nhấn, HIGH khi nhả)
  int buttonState = digitalRead(buttonPin);
  
  // Nếu nút được nhấn (trạng thái LOW)
  if (buttonState == LOW) {
    dis.clear();
    fingerprint_erollment_init();
    enroll_fingerprint();
  } else {
    // Nếu nút không được nhấn (trạng thái HIGH)
    dis.clear();
    fingerprint_detection_init();
    fingerprint_detection_loop();
  }
  delay(1000);
}
