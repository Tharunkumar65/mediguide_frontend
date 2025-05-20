import React from 'react';
import './Hiw.css';
import Navbar from '../Components/Navbar';

const Hiw = () => {
  return (
    <div className="how-it-works-outer">
       <Navbar />
       <div className="how-it-works-container">
       <h1>How Our Website Works</h1>
      
      <p>
        Users begin by clicking the "Predictor" link in the navigation bar. This takes them to a page where they can select symptoms from a dropdown menu. After choosing the relevant symptoms, clicking the "Predict" button initiates the disease prediction process.
      </p>

      <p>
        The frontend, built using React.js, captures the selected symptoms and makes a POST API call to the Flask backend. This is done using JavaScript's fetch. The selected symptoms are sent as JSON data in the body of the request.
      </p>

      <p>
        The Flask backend receives the incoming symptoms data, processes it, and passes it to the trained Support Vector Machine (SVM) model. The model then predicts the most likely disease based on the input symptoms.
      </p>

      <p>
        The dataset used for training was sourced from Kaggle and went through extensive preprocessing—handling missing values, removing duplicates, and encoding categorical values. Multiple machine learning models were trained including SVM, KNN, Random Forest, Naive Bayes, and Gradient Boosting. The SVM model achieved the highest accuracy of 96.74%, making it the final choice for deployment.
      </p>

      <p>
        Once the SVM model predicts a disease, the backend also fetches relevant information such as medications, precautions, diet plans, and workout routines from predefined mappings and datasets. This information is bundled into a JSON response and sent back to the frontend.
      </p>

      <p>
        On receiving the response, the React frontend dynamically updates the user interface to display the predicted disease and associated details like medications, precautions, diet, and workouts.
      </p>

      <p>
        Finally, both the frontend and backend are deployed on Render.com, allowing users to access the service from anywhere via a web browser.
      </p>
    </div>
    </div>
  );
};

export default Hiw;