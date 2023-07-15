import "./App.css"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route, Navigate  } from "react-router-dom"
import PageLayout from "./components/layout/pagelayout"
import Home from "./components/home"
import Drivers from "./components/drivers/drivers"
import Cabs from "./components/cabs/cabs"
import CabDriver from "./components/cab-driver/cabdriver"
import AddDriver from "./components/drivers/adddriver"
import AddCab from "./components/cabs/addcab"
import UpdateDriver from "./components/drivers/updatedriver"
import UpdateCab from "./components/cabs/updateCab"
import Login from "./components/auth/login"
import PrivateRoute from "./privateRoute";
import NotFound from "./components/auth/notFound"

function App() {
  return (
    <div className="app">
      <Router>
        <PageLayout>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route exact path="/drivers" element={<PrivateRoute><Drivers /></PrivateRoute>} />
            <Route exact path="/cabs" element={<PrivateRoute><Cabs /></PrivateRoute>} />
            <Route exact path="/cab-driver" element={<PrivateRoute><CabDriver /></PrivateRoute>} />
            <Route exact path="/addDriver" element={<PrivateRoute><AddDriver /></PrivateRoute>} />
            <Route exact path="/addCab" element={<PrivateRoute><AddCab /></PrivateRoute>} />
            <Route exact path="/updateDriver/:id" element={<PrivateRoute><UpdateDriver /></PrivateRoute>} />
            <Route exact path="/updateCab/:id" element={<PrivateRoute><UpdateCab /></PrivateRoute>} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </PageLayout>
      </Router>
    </div>
  )
}

export default App
