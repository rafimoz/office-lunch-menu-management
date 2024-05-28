import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Admin from './Admin'
import Addmenu from './Addmenu'
import Updatemenu from './Updatemenu'
import View from './View'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Admin />} />
                <Route path='/Addmenu' element={<Addmenu />} />
                <Route path='/update/:id' element={<Updatemenu />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;