import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Admin from './Admin';
import Addmenu from './Addmenu';
import Updatemenu from './Updatemenu';
import Employee from './Employee';

function App() {
    return (
        <BrowserRouter>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">User Panel</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin Panel</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Routes>
                    <Route path="/user" element={<Employee />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/addmenu" element={<Addmenu />} />
                    <Route path="/update/:id" element={<Updatemenu />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
