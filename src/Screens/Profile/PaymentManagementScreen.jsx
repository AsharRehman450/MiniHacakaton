// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// const PaymentManagementScreen = () => {
//   const [bookings, setBookings] = useState([]);
//   const [paidBookings, setPaidBookings] = useState([]);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     const storedBookings = JSON.parse(localStorage.getItem("bookedRooms")) || [];
//     fetchBookings(storedBookings);

//     // Load paid bookings from localStorage
//     const storedPaidBookings = JSON.parse(localStorage.getItem("paidBookings")) || [];
//     setPaidBookings(storedPaidBookings);
//   }, []);

//   const fetchBookings = async (bookedRoomIds) => {
//     try {
//       const response = await fetch("http://localhost:3000/Room");
//       const rooms = await response.json();
//       const bookedRooms = rooms.filter((room) => bookedRoomIds.includes(room.id));
//       setBookings(bookedRooms);
//     } catch (error) {
//       console.error("Error fetching booked rooms:", error);
//     }
//   };

//   const handlePayment = (roomId) => {
//     setSnackbar({ open: true, message: "Payment Successful!", severity: "success" });

//     // Update paid bookings state
//     setPaidBookings((prevPaid) => {
//       const updatedPaid = [...prevPaid, roomId];
//       localStorage.setItem("paidBookings", JSON.stringify(updatedPaid)); // Save to localStorage
//       return updatedPaid;
//     });
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Payment Management
//       </Typography>

//       <TableContainer component={Paper} elevation={3}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{background: 'linear-gradient(135deg, #6a1b9a, #9c27b0)'}}>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>Room ID</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {bookings.length > 0 ? (
//               bookings.map((room) => (
//                 <TableRow key={room.id}>
//                   <TableCell>{room.id}</TableCell>
//                   <TableCell>{room.type}</TableCell>
//                   <TableCell>${room.price}</TableCell>
//                   <TableCell>
//                     {paidBookings.includes(room.id) ? (
//                       <Button variant="contained" color="secondary" disabled>
//                         Paid
//                       </Button>
//                     ) : (
//                       <Button variant="contained" color="success" onClick={() => handlePayment(room.id)}>
//                         Pay
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No pending payments
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Snackbar for payment confirmation */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default PaymentManagementScreen;
import React, { useState, useEffect } from "react";
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

const PaymentManagementScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [paidBookings, setPaidBookings] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookedRooms")) || [];
    fetchBookings(storedBookings);

    // Load paid bookings from localStorage
    const storedPaidBookings = JSON.parse(localStorage.getItem("paidBookings")) || [];
    setPaidBookings(storedPaidBookings);
  }, []);

  const fetchBookings = async (bookedRoomIds) => {
    try {
      const response = await fetch("http://localhost:3000/Room");
      const rooms = await response.json();
      const bookedRooms = rooms.filter((room) => bookedRoomIds.includes(room.id));
      setBookings(bookedRooms);
    } catch (error) {
      console.error("Error fetching booked rooms:", error);
    }
  };

  const handlePayment = async (roomId, price) => {
    setSnackbar({ open: true, message: "Payment Successful!", severity: "success" });

    // Save to localStorage
    setPaidBookings((prevPaid) => {
      const updatedPaid = [...prevPaid, roomId];
      localStorage.setItem("paidBookings", JSON.stringify(updatedPaid));
      return updatedPaid;
    });

    // Save the payment to the backend
    try {
      await fetch("http://localhost:3000/Payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId, amount: price }),
      });
    } catch (error) {
      console.error("Error saving payment:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Payment Management
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(135deg, #6a1b9a, #9c27b0)" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Room ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.id}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell>
                    {paidBookings.includes(room.id) ? (
                      <Button variant="contained" sx={{ backgroundColor: "#4a148c" }} disabled>
                        Paid
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#4a148c" }}
                        onClick={() => handlePayment(room.id, room.price)}
                      >
                        Pay
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No pending payments
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for payment confirmation */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PaymentManagementScreen;
