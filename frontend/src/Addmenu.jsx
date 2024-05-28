import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Addmenu() {
    const [values, setValues] = useState({
        name: '',
        id:'',
        image: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/choices', values)
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err))
    }
    return (
    <div>
        <div class="p-5">
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="" class="form-label">ID</label>
                    <input type="text" class="form-control" placeholder='Enter ID' 
                    onChange={e => setValues({...values, id: e.target.value})}/>
                </div>
                <div class="mb-3">
                    <label htmlFor="" class="form-label">Name</label>
                    <input type="text" class="form-control" placeholder='Enter Name' 
                    onChange={e => setValues({...values, name: e.target.value})}/>
                </div>
                <div class="mb-3">
                    <label htmlFor="" class="form-label">Image</label>
                    <input type="file" class="form-control form-control-lg" onChange={e => setValues({...values, image: e.target.value})} />
                </div>
                <button class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Addmenu