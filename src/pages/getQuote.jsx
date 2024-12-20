import React, { useEffect, useState } from "react";

const GetQuote = () => {
  const initialtrain = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/train", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(features),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Error during prediction request:", error);
    }
  };

  const [features, setFeatures] = useState({
    healthCheckup_vitalSigns_bmi: "",
    healthCheckup_vitalSigns_bloodPressure_systolic: "",
    healthCheckup_vitalSigns_bloodPressure_diastolic: "",
    healthCheckup_vitalSigns_pulseRate: "",
    healthCheckup_vitalSigns_temperature: "",
  });

  useEffect(()=>{
    initialtrain();
  },[])

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeatures({ ...features, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(features),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Prediction successful! Predicted price is $ ${data.prediction}`);
      } else {
        const errorData = await response.json();
        setMessage(`Prediction failed: ${errorData.error}`);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error during prediction request:", error);
    }
  };

  return (
    <div style={{ width: "300px", margin: "0 auto", padding: "20px", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Input Features</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(features).map((feature) => (
          <div style={{ marginBottom: "10px" }} key={feature}>
            <input
              type="text"
              placeholder={feature.substring(25)}
              name={feature}
              value={features[feature]}
              onChange={handleChange}
              required
              style={{ width: "90%", padding: "8px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
        ))}
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Predict
        </button>
      </form>
      {message && (
        <div style={{ marginTop: "15px", color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default GetQuote;
