import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));

    axios.get('http://localhost:3000/bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Customer & Booking Management
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(135deg, #6a1b9a, #9c27b0)' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Booking</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(customer => (
              <TableRow key={customer.id} sx={{ backgroundColor: '#f9f9f9' }}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.username}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  {bookings.filter(booking => booking.userId === customer.id).map(booking => (
                    <Box key={booking.id} sx={{ backgroundColor: '#e3f2fd', padding: '8px', margin: '5px 0', borderRadius: '5px' }}>
                      Room: {booking.roomId} | Check-in: {booking.checkIn} | Check-out: {booking.checkOut} | Status: <strong>{booking.status}</strong>
                    </Box>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CustomerManagement;
