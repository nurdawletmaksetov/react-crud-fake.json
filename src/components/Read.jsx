import { Button, Flex } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Read() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then((res) => {
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers([...res.data.users, ...savedUsers]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const user = users.find(user => user.id === parseInt(id));

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className='w-auto border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>User Details</h1>
        <p><b>Name:</b> {user.firstName}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <Flex gap={10}>
          <Button variant='filled' color='green' onClick={() => navigate(`/update/${user.id}`)}>Edit</Button>
          <Button variant="filled" onClick={() => navigate(-1)}>Back</Button>
        </Flex>
      </div>
    </div>
  );
}

export default Read;
