import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { setUser } from '../store/Slices/authSlice';
import { auth, db } from '../../src/FirebaseConfig';
import { Box, Button, FormControl, FormLabel, TextField, Typography, Select, MenuItem, Checkbox, Divider, Link, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../Component/CustomIcon';
import "../Component/SignUp.css";

const SignUpContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  [theme.breakpoints.up('sm')]: {
    backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  },
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

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInputs = () => {
    let tempErrors = {};
    if (!email.match(/\S+@\S+\.\S+/)) tempErrors.email = 'Invalid email';
    if (password.length < 6) tempErrors.password = 'At least 6 characters';
    if (name.trim() === '') tempErrors.name = 'Name is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, role === 'admin' ? 'admins' : 'users', userCredential.user.uid);
      await setDoc(userRef, { name, email, role });
      dispatch(setUser({ uid: userCredential.user.uid, name, email, role }));
      
      toast.success('Signup successful!', {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/login');
    } catch (error) {
      console.error("Signup error:", error.message);
      toast.error('Error during signup, please try again!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div className='signUpstyling'>
      <SignUpContainer>
        <Card>
          <SitemarkIcon />
          <Typography variant="h4" align="center" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabel>Full Name</FormLabel>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />
            </FormControl>

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

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabel>Role</FormLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)} fullWidth>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Administrator</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />

            <Button type="submit" fullWidth variant="contained" sx={{ marginTop: 2 }}>
              Sign Up
            </Button>
          </form>

          <Divider sx={{ marginY: 2 }}>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button fullWidth variant="outlined" onClick={() => alert('Sign up with Google')} startIcon={<GoogleIcon />}>
              Sign up with Google
            </Button>
            <Button fullWidth variant="outlined" onClick={() => alert('Sign up with Facebook')} startIcon={<FacebookIcon />}>
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link component="button" onClick={() => navigate('/login')} variant="body2" sx={{ alignSelf: 'center' }}>
                Sign in
              </Link>
            </Typography>
          </Box>

          {/* ToastContainer here */}
          <ToastContainer />
        </Card>
      </SignUpContainer>
    </div>
  );
}
