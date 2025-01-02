#ifndef FINGERPRINT_ENROLLMENT_H
#define FINGERPRINT_ENROLLMENT_H

#include <LiquidCrystal_I2C.h>
#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>

extern LiquidCrystal_I2C dis;
extern SoftwareSerial mySerial;
extern Adafruit_Fingerprint finger;
extern uint8_t id;

void fingerprint_erollment_init();
uint8_t readnumber(void);
uint8_t getFingerprintEnroll(void);
void enroll_fingerprint(void);

#endif
