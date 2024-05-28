import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function View() {
    const {id} = useParams();
    const [choices, setChoices] = useState();
    useEffect(()=> {
        axios.get('http://localhost:8081/View/'+id)
        .then(res => {
            console.log(res)
            setChoices(res.data[0]);
        })
        .catch(err => console.error(err))
    }, [])
  return (
    <div>
        <h2>{choices.id}</h2>
        <h2>{choices.employee_name}</h2>
        Hello
    </div>
  )
}

export default View