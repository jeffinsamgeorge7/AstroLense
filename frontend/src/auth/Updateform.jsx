import React, { useState } from 'react';
import axios from 'axios';

const UpdateUserForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/api/update-user/', formData, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            // Handle success message or redirect to another page
        } catch (error) {
            console.error(error);
            // Handle error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
            <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateUserForm;
