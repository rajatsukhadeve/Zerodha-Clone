// dashboard/src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
 // Import Signup
import PrivateRoute from "./components/PrivateRoute";
import StockDashboard from "./components/StockDashboard";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
         

          {/* Protected Routes */}
          <Route 
            path="/*" 
            element={
              <PrivateRoute>
                <Home />

                
              </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;