import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
function Updatemenu() {

    const {id} = useParams();
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/edit/'+id)
            .then(res => {
                setName(res.data[0].employee_name);
            })
            .catch(err => console.log(err));
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8081/update/'+id, {name})
        .then(res => {
            if(res.data.updated){
                navigate('/');
            } else{
                alert("Not updated");
            }
        })
    }



    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Update Menu</h2>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' value={name}
                        onChange={e => setName(e.target.value)} />
                    </div>
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default Updatemenu