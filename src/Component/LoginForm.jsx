import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../src/FirebaseConfig'; // Firebase config
import { setUser } from '../store/Slices/authSlice'; // Redux slice
import { Box, Button, FormControl, FormLabel, TextField, Typography, Divider, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../Component/CustomIcon'; // Custom Icons
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "../Component/Login.css";
import { doc, getDoc } from 'firebase/firestore';

const SignInContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxWidth: '500px',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  backgroundColor: 'white',
  borderRadius: 8,
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInputs = () => {
    let tempErrors = {};
    if (!email.match(/\S+@\S+\.\S+/)) tempErrors.email = 'Invalid email';
    if (password.length < 6) tempErrors.password = 'At least 6 characters';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      // Pehle Users collection check karo
      let userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      let userData = userDoc.exists() ? userDoc.data() : null;
  
      // Agar user collection me nahi mila, to admins collection me check karo
      if (!userData) {
        userDoc = await getDoc(doc(db, "admins", userCredential.user.uid));
        userData = userDoc.exists() ? userDoc.data() : null;
      }
  
      // Agar phir bhi data na mile to error show karo
      if (!userData) {
        throw new Error("User not found in database.");
      }
  
      localStorage.setItem("uid", userCredential.user.uid);
      localStorage.setItem("userData", JSON.stringify(userData));
  
      dispatch(setUser({ uid: userCredential.user.uid, email, ...userData }));


      toast.success('Welcome back! Hope you have a great day.', {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/dashboard/');
    } catch (error) {
      console.error(error.message);
      setErrors({ ...errors, general: 'Invalid email or password' });
    }
  };

  return (
    <div className='loginstyling'>
      <SignInContainer>
        <Card>
          <SitemarkIcon />
          <Typography variant="h4" align="center" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            LogIn
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabel>Email</FormLabel>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabel>Password</FormLabel>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />
            </FormControl>
            {errors.general && (
              <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ marginTop: 2 }}>
              Sign in
            </Button>
          </form>

          <Divider sx={{ marginY: 2 }}>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                component="button"
                onClick={() => navigate('/signup')}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </div>
  );
}

