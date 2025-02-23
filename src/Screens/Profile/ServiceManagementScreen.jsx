import React, { useEffect, useState } from "react";
import { 
  Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Button 
} from "@mui/material";

const servicesList = [
  { id: 1, name: "Housekeeping", description: "Daily cleaning and maintenance." },
  { id: 2, name: "Laundry Service", description: "Washing and ironing of clothes." },
  { id: 3, name: "Spa & Wellness", description: "Relaxing massages and beauty treatments." },
  { id: 4, name: "Gym & Fitness", description: "Access to gym and personal trainers." },
  { id: 5, name: "Swimming Pool", description: "Indoor and outdoor pool access." },
  { id: 6, name: "Concierge Service", description: "Travel assistance and reservations." },
  { id: 7, name: "Airport Shuttle", description: "Comfortable airport transfer services." },
  { id: 8, name: "Car Rental", description: "Book rental cars at affordable rates." },
  { id: 9, name: "Private Dining", description: "Exclusive in-room dining experience." },
  { id: 10, name: "City Tour", description: "Guided tours to popular attractions." },
];

const ServiceManagementScreen = () => {
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("serviceRequests")) || [];
    setServiceRequests(storedRequests);
  }, []);

  const handleRequestService = (service) => {
    const newRequest = { id: Date.now(), name: service.name, status: "Pending" };
    const updatedRequests = [...serviceRequests, newRequest];
    setServiceRequests(updatedRequests);
    localStorage.setItem("serviceRequests", JSON.stringify(updatedRequests));
  };

  const handleCompleteService = (id) => {
    const updatedRequests = serviceRequests.map((req) =>
      req.id === id ? { ...req, status: "Completed" } : req
    );
    setServiceRequests(updatedRequests);
    localStorage.setItem("serviceRequests", JSON.stringify(updatedRequests));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Welcome Message */}
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 1, color: "#6a1b9a" }}>
        Welcome to Hotel Services
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 3, color: "#4a148c" }}>
        Experience luxury with our premium services. Choose from a variety of amenities to enhance your stay.
      </Typography>

      {/* Services Table */}
      <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(135deg, #6a1b9a, #9c27b0)" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Service</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicesList.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#6a1b9a", "&:hover": { backgroundColor: "#4a148c" } }}
                    onClick={() => handleRequestService(service)}
                  >
                    Request Service
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Service Requests Section */}
      <Typography variant="h5" align="center" sx={{ fontWeight: "bold", mt: 4, color: "#b71c1c" }}>
        Service Requests
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 2, color: "#880e4f" }}>
        Track your requested services below.
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(135deg, #b71c1c, #e53935)" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Requested Service</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceRequests.length > 0 ? (
              serviceRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.status === "Pending" && (
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#388e3c", "&:hover": { backgroundColor: "#1b5e20" } }}
                        onClick={() => handleCompleteService(request.id)}
                      >
                        Service Fulfilled
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">No service requests yet</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServiceManagementScreen;
