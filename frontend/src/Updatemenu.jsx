import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
function Updatemenu() {

    const {id} = useParams();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/edit/'+id)
            .then(res => {
                setName(res.data[0].employee_name);
                setImage(res.data[0].image);
            })
            .catch(err => console.log(err));
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8081/update/'+id, {name, image})
        .then(res => {
            if(res.data.updated){
                navigate('/admin');
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
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="file" 
                        onChange={e => setImage(e.target.value)} />
                    </div>

                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default Updatemenu