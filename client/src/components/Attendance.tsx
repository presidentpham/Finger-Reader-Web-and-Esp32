import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import moment from "moment-timezone";

interface AttendanceRecord {
  name: string;
  age: number;
  phone_number: string;
  email: string;
  fingerprint_code: string;
  checkin_time: string;
}

const Attendance: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    fetch("http://localhost:5000/api/attendance")
      .then((response) => response.json())
      .then((data) => setAttendanceData(data))
      .catch((error) => console.error("Error fetching attendance data:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Attendance</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Phone Number</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Fingerprint Code</th>
                <th style={styles.th}>Check-In Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index}>
                  <td style={styles.td}>{record.name}</td>
                  <td style={styles.td}>{record.age}</td>
                  <td style={styles.td}>{record.phone_number}</td>
                  <td style={styles.td}>{record.email}</td>
                  <td style={styles.td}>{record.fingerprint_code}</td>
                  <td style={styles.td}>{moment(record.checkin_time).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    marginTop: "60px",
    padding: "20px",
    marginLeft: "200px",
  } as React.CSSProperties,
  title: {
    fontSize: "36px",
    color: "white",
    marginBottom: "20px",
  } as React.CSSProperties,
  tableContainer: {
    width: "80%",
    maxWidth: "1000px",
    overflowX: "auto",
    boxSizing: "border-box",
  } as React.CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
  } as React.CSSProperties,
  th: {
    padding: "10px",
    background: "linear-gradient(to right, #1E3A8A, #2563EB)",
    color: "white",
    textAlign: "left",
  } as React.CSSProperties,
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  } as React.CSSProperties,
};

export default Attendance;
