import { Button, Flex, Pagination, Table } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const [users, setUsers] = useState([]);
    const [activePage, setPage] = useState(1);
    const pageSize = 5;
    const navigate = useNavigate();

    const handleAddUser = () => {
        navigate('/create');
    };

    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then((res) => {
                const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
                const mergedUsers = res.data.users.map(user => {
                    const updatedUser = savedUsers.find(u => u.id === user.id);
                    return updatedUser ? updatedUser : user;
                });
                const newUsers = savedUsers.filter(u => !res.data.users.some(apiU => apiU.id === u.id));
                setUsers([...mergedUsers, ...newUsers]);
            })
            .catch((err) => console.error(err));
    }, []);

    const start = (activePage - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUsers = users.slice(start, end);

    const rows = paginatedUsers.map((user) => (
        <Table.Tr key={user.id}>
            <Table.Td>{user.id}</Table.Td>
            <Table.Td>{user.firstName}</Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>{user.phone}</Table.Td>
            <Table.Td>
                <Flex gap={5}>
                    <Link to={`/read/${user.id}`} className='btn btn-primary'>Read</Link>
                    <Button variant='filled' color='green' onClick={() => navigate(`/update/${user.id}`)}>Edit</Button>
                    <Link to={`/delete/${user.id}`} className='btn btn-danger'>Delete</Link>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className="d-flex gap-4 flex-column justify-content-center align-items-center p-5">
            <h1>List of Users</h1>
            <div className="w-auto rounded bg-white border shadow p-4 d-flex flex-column align-items-center">
                <Flex justify="flex-end" align="center" pb="md" w="100%">
                    <Button variant='filled' color='blue' onClick={handleAddUser}>Add+</Button>
                </Flex>
                <Table
                    horizontalSpacing="xl"
                    withColumnBorders
                    verticalSpacing="sm"
                    highlightOnHover
                    withTableBorder
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Phone</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                <Pagination
                    total={Math.ceil(users.length / pageSize)}
                    value={activePage}
                    onChange={setPage}
                    mt="sm"
                />
            </div>
        </div>
    );
}

export default Home;
