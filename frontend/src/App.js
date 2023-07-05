import "./App.css"
import { useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import PageLayout from "./components/layout/pagelayout"
import Home from "./components/home"
import Drivers from "./components/drivers/drivers"
import Cabs from "./components/cabs/cabs"
import AddDriver from "./components/drivers/adddriver"
import AddCab from "./components/cabs/addcab"
import UpdateDriver from "./components/drivers/updatedriver"
import UpdateCab from "./components/cabs/updateCab"
import "dotenv/config"

function App() {
  return (
    <div className="app">
      <Router>
        <PageLayout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/drivers" element={<Drivers />} />
            <Route exact path="/cabs" element={<Cabs />} />
            <Route exact path="/addDriver" element={<AddDriver />} />
            <Route exact path="/addCab" element={<AddCab />} />
            <Route exact path="/updateDriver/:id" element={<UpdateDriver />} />
            <Route exact path="/updateCab/:id" element={<UpdateCab />} />
          </Routes>
        </PageLayout>
      </Router>
    </div>
  )
}

export default App
