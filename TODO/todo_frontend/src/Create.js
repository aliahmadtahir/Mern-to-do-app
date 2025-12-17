import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const Create = () => {
    const [task, setTask] = useState('');

    const API_BASE = process.env.REACT_APP_API_URL || '/api';

    const createTask = () => {
        axios.post(`${API_BASE}/add`, { task: task.trim() })
            .then(result => {
                console.log(result.data);
                window.location.reload();
                setTask('');
            })
            .catch(err => console.log(err));
    };

    return (
        <main>
            <h1>Todo List</h1>
            <div className='create-form'>
                <input
                    type='text'
                    placeholder='Enter a task'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <button onClick={createTask}>ADD</button>
            </div>
        </main>
    );
};

export default Create;
