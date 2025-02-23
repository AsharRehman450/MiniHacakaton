import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Collapse } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import { Routes, Route } from 'react-router-dom';
import Profile from '../Screens/Profile/Profile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { LayoutDashboard, UserCheck, ListOrdered, FilePlus, Book, ClipboardList, FileText, Coins, CalendarCheck, FileCheck2, UserCircle2 } from "lucide-react";
import Main from './Main';
import DashBoard from '../Screens/Profile/Dashboard';
import CustomerManagement from '../Screens/Profile/CustomerManagement';
import BookingManagement from '../Screens/Profile/BookingManagement.JSX';
import InventoryManagementScreen from '../Screens/Profile/InventoryManagementScreen';
import PaymentManagementScreen from '../Screens/Profile/PaymentManagementScreen';
import RoomManagement from '../Screens/Profile/RoomManagement';
import ServiceManagementScreen from '../Screens/Profile/ServiceManagementScreen';

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState({});
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const toggleDropdown = (section) => {
    setOpen((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const data = [
    { name: 'Students', count: 120 },
    { name: 'Teachers', count: 30 },
    { name: 'Classes', count: 15 },
    { name: 'Subjects', count: 20 },
  ];

  const pages = [
    {
      name: 'DashBoard',
      icon: <LayoutDashboard />,
      path:"/dashboard/DashboardScreen" ,
    },
            {
                name: 'Customer Management',
                icon: <LayoutDashboard />,
               path:"/dashboard/CustomerManagement" ,   
              },
              {
                name: 'Room Management',
                icon: <LayoutDashboard />,
               path:"/dashboard/RoomManagement" ,   
              },
              {
                name: 'Booking Management ',
                icon: <LayoutDashboard />,
               path:"/dashboard/BookingManagement" ,   
              },       
              {
                name: 'Payment Management Screen',
                icon: <LayoutDashboard />,
               path:"/dashboard/PaymentManagementScreen" ,   
              },
              {
                name: 'Service Management Screen',
                icon: <LayoutDashboard />,
               path:"/dashboard/ServiceManagementScreen",   
              },
              {
                name: 'Inventory Management Screen',
                icon: <LayoutDashboard />,
               path:"/dashboard/InventoryManagementScreen",   
              },
              {
                name: 'Profile Management Screen',
                icon: <LayoutDashboard />,
               path:"/dashboard/Profile",   
              },
  ];
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {pages.map((obj, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={obj.path}>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const isDashboard = location.pathname === '/dashboard';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  
      position="fixed" 
    //   fullWidth
      sx={{background: "linear-gradient(to top right, #ffffff 10%, #673AB7 47%)",color:"black",width:"100%" }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component={Link} to="/dashboard" color="inherit" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <DashboardIcon sx={{ mr: 1 }} /> Hotel Management  
          </Typography>

        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': {boxSizing:"border-box",width:drawerWidth ,marginTop:"65px" }  }}
          open
        >
          {drawer}
        </Drawer>
        
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          
        
       {/* <Typography color='black' textAlign={"center"} variant="h4">Dashboard </Typography> */}
         

        </motion.div>

    

         <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/DashboardScreen" element={<DashBoard/>}/>
          <Route path="/CustomerManagement" element={<CustomerManagement/>}/>
           <Route path="/BookingManagement" element={<BookingManagement/>}/>
           <Route path="/InventoryManagementScreen" element={<InventoryManagementScreen/>}/>
          <Route path="/PaymentManagementScreen" element={<PaymentManagementScreen/>}/>
          <Route path="/RoomManagement" element={<RoomManagement/>}/>
          <Route path="/ServiceManagementScreen" element={<ServiceManagementScreen/>}/>

          <Route path="Profile" element={<Profile />} />
        </Routes> 
      </Box>
    </Box>
  );
}

Dashboard.propTypes = { window: PropTypes.func };
export default Dashboard;