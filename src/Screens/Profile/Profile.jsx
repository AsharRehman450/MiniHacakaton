import React, { useEffect, useState } from 'react';
import { Avatar, CardContent, Typography, Box, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import userpng from "../../../public/pngtree-user-cartoon-circular-pattern-image_1200095.jpg"
import { toast } from 'react-toastify';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData)); 
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("userData"); 
          toast.error('There was an error with your stored data. Please log in again.');
          navigate('/');
        }
      } else {
        toast.error('No user data found. Please log in.');
        navigate('/');
      }
    }, [navigate]);
  
    const Logout = () => {
      localStorage.clear();
      setUserData(null);
      toast.success('You’re logged out! Your data is secure. See you next time!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(`/`);
    };
  
    if (!userData) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>Loading...</Typography>
        </Box>
      );
    }
  
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          marginTop: "25px",
          background: "linear-gradient(to top right, #ffffff 10%, #673AB7 70%)",
          p: 3
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ width: '100%', maxWidth: '600px' }}
        >
          <Paper
            elevation={10}
            sx={{
              width: '100%',
              p: 4,
              textAlign: 'center',
              borderRadius: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Avatar
              src={userData?.photoURL || userpng}
              alt="User Profile"
              sx={{
                width: 140,
                height: 140,
                margin: "auto",
                mb: 2,
                border: '4px solid #e94560'
              }}
            />
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                fontWeight="bold"
                sx={{ color: "#fff", textTransform: "uppercase", mb: 1 }}
              >
                {userData?.name || 'Basim'}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ fontSize: 18, fontWeight: 'bold', color: "#ddd", mb: 1 }}
              >
                Gmail: {userData?.email || 'basim@example.com'}
              </Typography>
  
              {/* Display Role */}
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ fontSize: 18, fontWeight: 'bold', color: "#ddd", mb: 1 }}
              >
                Role: {userData?.role || 'User'}
              </Typography>
  
              <Button
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
                sx={{
                  mt: 3,
                  fontWeight: 'bold',
                  fontSize: 16,
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  backgroundColor: '#e94560',
                  '&:hover': { backgroundColor: '#b02a48' }
                }}
                onClick={Logout}
              >
                Logout
              </Button>
            </CardContent>
          </Paper>
        </motion.div>
      </Box>
    );
  };
  
  export default Profile;
  