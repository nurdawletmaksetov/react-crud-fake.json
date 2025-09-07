import { Button, Flex, Paper, Text, TextInput } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${id}`)
      .then((res) => {
        const user = res.data;
        setValues({
          name: user.firstName || '',
          email: user.email || '',
          phone: user.phone || '',
        });
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios.put(`https://dummyjson.com/users/${id}`, values)
      .then((res) => {
        console.log("Updated:", res.data);

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.map((u) =>
          u.id === parseInt(id) ? { ...u, firstName: values.name, email: values.email, phone: values.phone } : u
        );
        localStorage.setItem("users", JSON.stringify(users));

        navigate('/');
      });
  };

  return (
    <div className="w-100 vh-100 justify-content-center d-flex align-items-center">
      <Paper withBorder w="400" shadow="md" p={30} mt={30} radius="md">
        <Text fw={500} size="lg" mb="md">Update User</Text>
        <form onSubmit={handleUpdate}>
          <TextInput
            name="name"
            label="Name:"
            placeholder="Enter name"
            required
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          <TextInput
            name="email"
            label="Email:"
            placeholder="Enter email"
            type="email"
            required
            mt="md"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <TextInput
            name="phone"
            label="Phone:"
            placeholder="Enter phone number"
            required
            mt="md"
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />

          <Flex gap={15} mt="xl">
            <Button color="green" type="submit">
              Update
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back
            </Button>
          </Flex>
        </form>
      </Paper>
    </div>
  );
}

export default Update;
