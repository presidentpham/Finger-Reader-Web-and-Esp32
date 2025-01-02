import React, { useState } from "react";
import Navbar from "./Navbar";
import { FaFingerprint } from "react-icons/fa";

const AddFingerprint: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    fingerprint: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn form reload trang
    try {
      const response = await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Employee added successfully!");
        setFormData({ name: "", age: "", phone: "", email: "", fingerprint: "" }); // Reset form
      } else {
        alert("Failed to add employee.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the employee.");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Add Fingerprint</h2>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="name" style={styles.label}>Name:</label>
              <input
                type="text"
                id="name"
                style={styles.input}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="age" style={styles.label}>Age:</label>
              <input
                type="number"
                id="age"
                style={styles.input}
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="phone" style={styles.label}>Phone Number:</label>
              <input
                type="tel"
                id="phone"
                style={styles.input}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email:</label>
              <input
                type="email"
                id="email"
                style={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.inputGroup}><label htmlFor="fingerprint" style={styles.label}>Fingerprint Code:</label>
              <input
                type="text"
                id="fingerprint"
                style={styles.input}
                value={formData.fingerprint}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        </div>

        <div style={styles.iconContainer}>
          <FaFingerprint size={300} color="#00A3E0" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-around", // Canh giữa các phần
    alignItems: "center", // Căn giữa theo chiều dọc
    height: "100vh", // Chiếm toàn bộ chiều cao màn hình
    marginTop: "60px", // Để tránh trùng lặp với navbar
    padding: "20px",
    boxSizing: "border-box",
    width: "200vh",
  } as React.CSSProperties,
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "50%", // Form chiếm 50% chiều rộng
    paddingRight: "20px",
    boxSizing: "border-box",
    marginLeft: 100,
  } as React.CSSProperties,
  title: {
    fontSize: "36px",
    color: "white", // Title màu trắng để phù hợp với nền gradient
    marginBottom: "20px",
    textAlign: "left",
  } as React.CSSProperties,
  form: {
    width: "100%",
  } as React.CSSProperties,
  inputGroup: {
    marginBottom: "15px",
    width: "100%",
  } as React.CSSProperties,
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "16px",
    color: "white",
  } as React.CSSProperties,
  input: {
    padding: "8px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
  } as React.CSSProperties,
  button: {
    padding: "10px 20px",
    background: "linear-gradient(to right, #00A3E0, #0077B6)", // Gradient blue color for button
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  } as React.CSSProperties,
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%", // Icon chiếm 50% chiều rộng
    boxSizing: "border-box",
  } as React.CSSProperties,
};

export default AddFingerprint;