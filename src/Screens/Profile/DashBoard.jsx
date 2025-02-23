// import React, { useEffect, useState } from "react";
// import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
// import axios from "axios";
// import PeopleIcon from "@mui/icons-material/People";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
// import PaymentsIcon from "@mui/icons-material/Payments";

// const DashboardScreen = () => {
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3000/users").then((res) => setUsers(res.data));
//     axios.get("http://localhost:3000/bookings").then((res) => setBookings(res.data));
//     axios.get("http://localhost:3000/Room").then((res) => setRooms(res.data));
//     axios.get("http://localhost:3000/Payment").then((res) => setPayments(res.data));
//   }, []);

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ background: "linear-gradient(135deg, #1976d2, #42a5f5)", color: "#fff", boxShadow: 3, borderRadius: 3 }}>
//             <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <PeopleIcon sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Total Users</Typography>
//                 <Typography variant="h4">{users.length}</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ background: "linear-gradient(135deg, #2e7d32, #66bb6a)", color: "#fff", boxShadow: 3, borderRadius: 3 }}>
//             <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <EventAvailableIcon sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Total Bookings</Typography>
//                 <Typography variant="h4">{bookings.length}</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ background: "linear-gradient(135deg, #d32f2f, #ef5350)", color: "#fff", boxShadow: 3, borderRadius: 3 }}>
//             <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <MeetingRoomIcon sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Available Rooms</Typography>
//                 <Typography variant="h4">{rooms.length}</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ background: "linear-gradient(135deg, #fbc02d, #ffeb3b)", color: "#000", boxShadow: 3, borderRadius: 3 }}>
//             <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <PaymentsIcon sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Total Payments</Typography>
//                 <Typography variant="h4">${payments.reduce((sum, p) => sum + p.amount, 0)}</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DashboardScreen;
// import React, { useEffect, useState } from "react";
// import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
// import axios from "axios";
// import PeopleIcon from "@mui/icons-material/People";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
// import PaymentsIcon from "@mui/icons-material/Payments";

// const DashboardScreen = () => {
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3000/users").then((res) => setUsers(res.data));
//     axios.get("http://localhost:3000/bookings").then((res) => setBookings(res.data));
//     axios.get("http://localhost:3000/Room").then((res) => setRooms(res.data));
//     axios.get("http://localhost:3000/Payment").then((res) => setPayments(res.data));
//   }, []);

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ background: "linear-gradient(135deg, #1976d2, #42a5f5)", color: "#fff", boxShadow: 3, borderRadius: 3 }}>
//             <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <PeopleIcon sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Total Users</Typography>
//                 <Typography variant="h4">{users.length}</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ background: "linear-gradient(135deg, #2e7d32, #66bb6a)", color: "#fff", boxShadow: 3, borderRadius: 3 }}>
//             <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <EventAvailableIcon sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Total Bookings</Typography>
//                 <Typography variant="h4">{bookings.length}</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ background: "linear-gradient(135deg, #d32f2f, #ef5350)", color: "#fff", boxShadow: 3, borderRadius: 3 }}>
//             <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <MeetingRoomIcon sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Available Rooms</Typography>
//                 <Typography variant="h4">{rooms.length}</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ background: "linear-gradient(135deg, #fbc02d, #ffeb3b)", color: "#000", boxShadow: 3, borderRadius: 3 }}>
//             <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <PaymentsIcon sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Total Payments</Typography>
//                 <Typography variant="h4">${payments.reduce((sum, p) => sum + (p.amount || 0), 0)}</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DashboardScreen;
import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import PeopleIcon from "@mui/icons-material/People";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PaymentsIcon from "@mui/icons-material/Payments";

const DashboardScreen = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => setUsers(res.data));
    axios.get("http://localhost:3000/bookings").then((res) => setBookings(res.data));
    axios.get("http://localhost:3000/Room").then((res) => setRooms(res.data));

    // Fetch total payments from localStorage
    const storedTotalPayments = parseFloat(localStorage.getItem("totalPayments")) || 0;
    setTotalPayments(storedTotalPayments);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(135deg, #1976d2, #42a5f5)", color: "#fff", boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PeopleIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{users.length}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(135deg, #2e7d32, #66bb6a)", color: "#fff", boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <EventAvailableIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Total Bookings</Typography>
                <Typography variant="h4">{bookings.length}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(135deg, #d32f2f, #ef5350)", color: "#fff", boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <MeetingRoomIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Available Rooms</Typography>
                <Typography variant="h4">{rooms.length}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(135deg, #fbc02d, #ffeb3b)", color: "#000", boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PaymentsIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Total Payments</Typography>
                <Typography variant="h4">${totalPayments.toFixed(2)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
