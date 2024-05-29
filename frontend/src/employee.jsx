import React, { useEffect, useState } from 'react';

function Employee() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Add 1 day to get the current date
    const formattedDate = currentDate.toISOString().split('T')[0];
    console.log(formattedDate);
    fetch(`http://localhost:8081/view?date=${formattedDate}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);


  const handleSelect = (choiceId) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Add 1 day to get the current date
    const formattedDate = currentDate.toISOString().split('T')[0];
    fetch('http://localhost:8081/saveChoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            user_name: userName,
            choice_id: choiceId,
            choice_date: formattedDate
        })
    })
    .then(res => res.json())
    .then(data =>  alert("Successfully selected!"))
    .catch(err => console.log(err));
  };

  return (
    <div class="p-5">
      <form > 
          <div>
              <label class="form-label">User ID:</label>
              <input class="form-control" type="text" value={userId} onChange={e => setUserId(e.target.value)} required />
          </div>
          <div>
              <label class="form-label">User Name:</label>
              <input class="form-control" type="text" value={userName} onChange={e => setUserName(e.target.value)} required />
          </div>
      </form>
      <h2 class="mt-5">Daily Menu</h2>
      <p>Today's date</p>
      <table class="mt-5">
        <thead>
          <tr class="mb-3">
            <th class="border  p-2">Menu ID</th>
            <th class="border  p-2">Menu Name</th>
            <th class="border  p-2">Image</th>
            <th class="border  p-2">Date</th>
            <th class="border  p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr className="mb-3" key={i}>
              <td class="border  p-2">{d.id}</td>
              <td class="border  p-2">{d.employee_name}</td>
              <td class="border  p-2">{d.image}</td>
              <td class="border  p-2">{d.date}</td>
              <td class="border  p-2">
                  <button class="btn btn-success" onClick={() => handleSelect(d.id)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;