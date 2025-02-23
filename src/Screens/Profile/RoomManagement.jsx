import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ type: "", price: "", available: true });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/Room")
      .then((response) => setRooms(response.data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  const handleAddRoom = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/Room", newRoom)
      .then((response) => {
        setRooms([...rooms, response.data]);
        setSnackbar({ open: true, message: "Room added successfully!", severity: "success" });
      })
      .catch((error) => console.error("Error adding room:", error));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Room Management
      </Typography>

      <form onSubmit={handleAddRoom} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Room Type"
          variant="outlined"
          fullWidth
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          value={newRoom.price}
          onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Room
        </Button>
      </form>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(135deg, #6a1b9a, #9c27b0)' }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id} sx={{ backgroundColor: room.available ? "#e8f5e9" : "#ffebee" }}>
                <TableCell>{room.id}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>${room.price}</TableCell>
                <TableCell>{room.available ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RoomManagement;
