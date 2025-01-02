#ifndef FINGERPRINT_DETECTION_H
#define FINGERPRINT_DETECTION_H

#include <LiquidCrystal_I2C.h>
#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>

extern SoftwareSerial mySerial;
extern Adafruit_Fingerprint finger;
extern LiquidCrystal_I2C dis;
extern byte ID;
extern bool Switch;

void fingerprint_detection_init();
void fingerprint_detection_loop();
int getFingerprintIDez();

#endif
