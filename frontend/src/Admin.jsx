import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Admin() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/choices')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);


    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/delete/' + id)
        .then(res => {
            location.reload();
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <div>
                <Link class="btn btn-primary" to="/addMenu" >Add Menu +</Link>
            </div>
            <table>
                <thead>
                    <tr class="mb-3">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr class="mb-3" key={i}>
                            <td>{d.id}</td>
                            <td>{d.employee_name}</td>
                            <td>{d.image}</td>
                            <td>
                                <Link class="btn btn-secondary" to={`/update/${d.id}`}>Edit</Link>
                                <button class="btn btn-danger" onClick={ () => handleDelete(d.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin