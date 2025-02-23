import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const BookingManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Function to load data from localStorage
  const loadBookingsFromStorage = () => {
    const storedBookings = JSON.parse(localStorage.getItem("bookedRooms")) || [];
    return storedBookings;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/Room")
      .then((response) => {
        const storedBookings = loadBookingsFromStorage();
        const updatedRooms = response.data.map((room) => ({
          ...room,
          available: !storedBookings.includes(room.id),
        }));
        setRooms(updatedRooms);
        setTotalBookings(storedBookings.length);
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  const handleBookRoom = (roomId) => {
    axios
      .patch(`http://localhost:3000/Room/${roomId}`, { available: false })
      .then(() => {
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === roomId ? { ...room, available: false } : room
          )
        );

        // Save booking to localStorage
        const bookedRooms = loadBookingsFromStorage();
        bookedRooms.push(roomId);
        localStorage.setItem("bookedRooms", JSON.stringify(bookedRooms));

        setTotalBookings(bookedRooms.length);
        setSnackbar({
          open: true,
          message: "Room booked successfully!",
          severity: "success",
        });
      })
      .catch((error) => console.error("Error booking room:", error));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Booking Management
      </Typography>

      {/* Total Bookings Display */}
      <Typography
        variant="h6"
        align="center"
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        Total Bookings: {totalBookings}
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(135deg, #6a1b9a, #9c27b0)' }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}> Room ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Availability</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.id}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell>{room.available ? "Available" : "Booked"}</TableCell>
                  <TableCell>
                    {room.available ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleBookRoom(room.id)}
                      >
                        Book
                      </Button>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Booked
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No available rooms
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookingManagement;
