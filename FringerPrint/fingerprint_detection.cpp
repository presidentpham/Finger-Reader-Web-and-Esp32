#include "fingerprint_detection.h"

byte IDs[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20};  // Enter your fingerprint ID
bool Switch = true;

void fingerprint_detection_init() {
  dis.init();
  dis.backlight();
  pinMode(4, OUTPUT); // LED pin setup
  dis.setCursor(0, 0);
  dis.print("Check attendance");
  while (!Serial);  // For Yun/Leo/Micro/Zero/...
  delay(100);
  Serial.println("\n\nAdafruit Fingerprint sensor initialization");

  // set the data rate for the sensor serial port
  finger.begin(57600);
  delay(5);

  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1) {
      delay(1);
    }
  }

  finger.getParameters();
  finger.getTemplateCount();
  
  if (finger.templateCount == 0) {
    Serial.print("Sensor doesn't contain any fingerprint data. Please run the 'enroll' example.");
  } else {
    Serial.println("Waiting for valid finger...");
    Serial.print("Sensor contains "); 
    Serial.print(finger.templateCount); 
    Serial.println(" templates");
  }
}

void fingerprint_detection_loop() {
  int value = getFingerprintIDez();

  for(int i = 0; i < sizeof(IDs) / sizeof(IDs[0]); i++){
    if (value == IDs[i]) {
    dis.setCursor(0, 1);
    dis.print("Check OK");
    Wire.beginTransmissi
    on(8);  // Địa chỉ ESP32 (slave)
    Wire.write('D');            // Gửi ký tự 'D'
    Wire.write(value);             // Gửi ID vân tay
    Wire.endTransmission();     // Kết thúc truyền
    delay(2000);
  } else {
    dis.setCursor(0, 1);
    dis.print("Check here");
  }
  }
  delay(50);
}

// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK) return -1;

  return finger.fingerID;
}
