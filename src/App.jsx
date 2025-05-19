// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Predict from './Pages/Predict'; 
import Hiw  from './Pages/Hiw'

function App() {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="Hiw" element={<Hiw/>} />
        <Route path="predict" element={<Predict />} />
    </Routes>
  );
}

export default App;

