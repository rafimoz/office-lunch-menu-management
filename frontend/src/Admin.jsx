import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Admin() {
    const [data, setData] = useState([]);
    const [userChoices, setUserChoices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/choices')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));

        fetch('http://localhost:8081/userChoices')
            .then(res => res.json())
            .then(data => setUserChoices(data))
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
                <Link class="btn btn-primary mt-4" to="/addMenu" >Add Menu +</Link>
            </div>
            <table class="mt-1">
                <thead>
                    <tr class="mb-3">
                        <th class="border  p-2">ID</th>
                        <th class="border  p-2">Name</th>
                        <th class="border  p-2">Image</th>
                        <th class="border  p-2">Date</th>
                        <th class="border  p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr class="mb-3" key={i}>
                            <td class="border  p-2">{d.id}</td>
                            <td class="border  p-2">{d.employee_name}</td>
                            <td class="border  p-2">{d.image}</td>
                            <td class="border  p-2">{d.date}</td>
                            <td class="border  p-2">
                                <Link class="btn btn-secondary" to={`/update/${d.id}`}>Edit</Link>
                                <button class="btn btn-danger" onClick={ () => handleDelete(d.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 class="mt-5">User Choices</h2>
            <table>
                <thead>
                    <tr className="mb-3">
                        <th class="border  p-2">User ID</th>
                        <th class="border  p-2">User Name</th>
                        <th class="border  p-2">Menu ID</th>
                        <th class="border  p-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {userChoices.map((choice, i) => (
                        <tr className="mb-3" key={i}>
                            <td class="border  p-2">{choice.user_id}</td>
                            <td class="border  p-2">{choice.user_name}</td>
                            <td class="border  p-2">{choice.choice_id}</td>
                            <td class="border  p-2">{choice.choice_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin