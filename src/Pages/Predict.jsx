import React, { useState } from 'react';
import Select from 'react-select';
import symptomsData from './symptoms';
import './Predict.css';

import Navbar from '../Components/Navbar';
const categories = [
  { label: "Disease Info", value: "description" },
  { label: "Medications", value: "medicines" },
  { label: "Precautions", value: "precautions" },
  { label: "Workout Plans", value: "workout" },
  { label: "Diet Plans", value: "diet" },
];

export default function Predict() {
  // Added states for API result, loading, and error
  const [selectedTab, setSelectedTab] = useState("description"); // default to disease info
  const [symptomsList, setSymptomsList] = useState([]);
  const [result, setResult] = useState(null);  // store API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");


  const handleChange = (selectedOptions) => {
    setSymptomsList(selectedOptions);
  };

  // Modified handleSubmit to call API
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   const symptoms = symptomsList.map(s => s.value); // extract symptom values

  //   try {
  //     const response = await fetch('http://localhost:5000/predict', {  // your API endpoint here
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ symptoms }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Server error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setResult(data);
  //     setSelectedTab("description");  // switch to disease info tab automatically
  //   } catch (err) {
  //     setError(err.message);
  //     setResult(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError(""); // reset previous validation error
    setError(null);
    setResult(null);
  
    if (symptomsList.length < 3) {
      setValidationError("Please select at least 3 symptoms.");
      return;
    }
  
    setLoading(true);
  
    const symptoms = symptomsList.map(s => s.value);
  
    try {
      const response = await fetch('https://flask-backend-krq3.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
      setResult(data);
      setSelectedTab("description");
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };
  

  let meds = [];

if (result && Array.isArray(result.medications) && result.medications.length > 0) {
  let medsString = result.medications[0]; // get the first string

  meds = medsString
    .replace(/^\[|\]$/g, "")    // remove starting and ending brackets
    .replace(/'/g, "")          // remove single quotes
    .split(",")                 // split by comma
    .map(item => item.trim());  // trim whitespace
}

let dietList = [];

if (result && result.diet && typeof result.diet[0] === "string") {
  // Parse the first string item like "['item1', 'item2']"
  dietList = result.diet[0]
    .replace(/^\[|\]$/g, "")   // remove starting and ending brackets
    .replace(/'/g, "")         // remove single quotes
    .split(",")                // split by commas
    .map(item => item.trim()); // trim whitespace
}




  return (
    <div className="predict-container">
        <Navbar />

      <div className="header-section">
        <h1>Symptom Predictor</h1>
        <p>
          Welcome to our Symptom Input Page - your first step towards personalized healthcare. Here, you have the opportunity to share your symptoms, allowing us to provide you with accurate and tailored medical advice.
        </p>
      </div>

      <div className="form-section">
        <h2>Symptoms List:</h2>
        <form onSubmit={handleSubmit}>
          <Select
            isMulti
            options={symptomsData}
            value={symptomsList}
            onChange={handleChange}
            className="select-box"
            classNamePrefix="react-select"
            placeholder="Select symptoms..."
          />
          <div className="form-actions">
            <button type="submit" className="predict-button">Predict</button>
          </div>
          {validationError && <p className="error">{validationError}</p>}
        </form>

        <div className="tab-buttons">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedTab(cat.value)}
              className={selectedTab === cat.value ? "active" : ""}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <h3>{categories.find(cat => cat.value === selectedTab)?.label}</h3>

          {loading && <p>Loading...</p>}
          {error && <p className="error">Error: {error}</p>}

          {!loading && !error && result && (
            <>
            {selectedTab === "description" && (
  <div>
    <p><strong>{result.disease}</strong></p>
    <br />
    <p>{result.description || "No info available"}</p>
  </div>
)}

{selectedTab === "precautions" && (
  <ul>
    {Array.isArray(result.precautions) && result.precautions.length > 0 ? (
      result.precautions[0].map((item, i) => <li key={i}>{item}</li>)
    ) : (
      <li>No precautions available</li>
    )}
  </ul>
)}

              {selectedTab === "workout" && (
                <ul>
                  {result.workout && result.workout.length > 0
                    ? result.workout.map((w, i) => <li key={i}>{w}</li>)
                    : <li>No workout plans available</li>}
                </ul>
              )}

{selectedTab === "medicines" && (
  <div>
    
    <ul>
      {meds.length > 0 ? meds.map((med, i) => <li key={i}>{med}</li>) : <li>No medications available</li>}
    </ul>
  </div>
)}



{selectedTab === "diet" && (
      <div>
       
        <ul>
          {dietList.length > 0 ? (
            dietList.map((d, i) => <li key={i}>{d}</li>)
          ) : (
            <li>No diet plans available</li>
          )}
        </ul>
      </div>
    )}
            </>
          )}

          {!loading && !error && !result && (
            <p>Please select symptoms and click Predict to see results.</p>
          )}
        </div>
      </div>
    </div>
  );
}
