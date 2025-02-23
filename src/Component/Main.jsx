import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  CardMedia
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PaymentIcon from "@mui/icons-material/Payment";
import InventoryIcon from "@mui/icons-material/Inventory";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useSelector } from "react-redux";
import roombookingImg from "../../public/roombookingImg.jpg"
import ViewReservations from "../../public/viewReservationsimages.jpg"
import payments from "../../public/payment.jpg"
import ineventoryImg from "../../public/inventoryimg.jpg"
import customerImg from "../../public/customer-avif.avif"

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || "user";

  const features = [
    {
      title: "Room Booking",
      description: "Book and manage room reservations",
      icon: <HotelIcon fontSize="large" color="primary" />,
      image: roombookingImg,
    },
    {
      title: "View Reservations",
      description: "Check all upcoming reservations",
      icon: <EventAvailableIcon fontSize="large" color="secondary" />,
      image: ViewReservations,
    },
    {
      title: "Payments",
      description: "Manage pending and completed transactions",
      icon: <PaymentIcon fontSize="large" color="success" />,
      image: payments,
    },
    {
      title: "Inventory Management",
      description: "Track and manage hotel inventory",
      icon: <InventoryIcon fontSize="large" color="info" />,
      image:ineventoryImg,
    },
    {
      title: "Customer Support",
      description: "Assist customers with their queries",
      icon: <SupportAgentIcon fontSize="large" color="warning" />,
      image: customerImg,
    }
  ];

  if (role === "admin") {
    features.push({
      title: "Admin Controls",
      description: "Access full hotel management features",
      icon: <AdminPanelSettingsIcon fontSize="large" color="error" />,
    });
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Hotel Management Dashboard
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
        Manage bookings, payments, and inventory efficiently
      </Typography>
      
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
              <CardActionArea href={feature.link}>
                <CardMedia
                  component="img"
                  height="140"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent>
                  <Box display="flex" alignItems="center">
                    {feature.icon}
                    <Box ml={2}>
                      <Typography variant="h6">{feature.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Main;
