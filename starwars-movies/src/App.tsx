import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Film from './Pages/Film'
import Planet from './Pages/Planet'
import Species from './Pages/Species'
import People from './Pages/People'
import Starships from './Pages/Starships'
import Vehicles from './Pages/Vehicles'
import Search from './Pages/Search'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="/films/:id" element={<Film />} />
                    <Route path="/people/:id" element={<People />} />
                    <Route path="/planets/:id" element={<Planet />} />
                    <Route path="/species/:id" element={<Species />} />
                    <Route path="/starships/:id" element={<Starships />} />
                    <Route path="/vehicles/:id" element={<Vehicles />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
