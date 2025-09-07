import { Button, Flex, Paper, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: values.name,
                email: values.email,
                phone: values.phone,
            })
        })
            .then(res => res.json())
            .then((newUser) => {
                console.log(newUser);
                const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
                localStorage.setItem("users", JSON.stringify([...savedUsers, newUser]));
                navigate('/');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="w-100 vh-100 justify-content-center d-flex align-items-center">
            <Paper withBorder w="400" shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={handleSubmit}>
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

                    <Flex gap={15}>
                        <Button color="green" w="auto" mt="xl" type="submit">
                            Create
                        </Button>
                        <Button w="auto" mt="xl" onClick={() => navigate('/')}>
                            Back
                        </Button>
                    </Flex>
                </form>
            </Paper>
        </div>
    );
}

export default Create;
