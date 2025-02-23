import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const initialInventory = [
  { id: 1, name: "Bedsheets", quantity: 50, category: "Linen" },
  { id: 2, name: "Towels", quantity: 30, category: "Linen" },
  { id: 3, name: "Shampoo Bottles", quantity: 20, category: "Toiletries" },
  { id: 4, name: "Water Bottles", quantity: 100, category: "Beverages" },
];

const InventoryManagementScreen = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: "", quantity: "", category: "" });

  const handleOpen = (item = null) => {
    setEditingItem(item);
    setForm(item ? { ...item } : { name: "", quantity: "", category: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (editingItem) {
      setInventory(
        inventory.map((item) => (item.id === editingItem.id ? { ...form, id: editingItem.id } : item))
      );
    } else {
      setInventory([...inventory, { ...form, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2, color: "#d32f2f" }}>
        Inventory Management
      </Typography>
      <Button
        variant="contained"
        sx={{ mb: 2, backgroundColor: "#388e3c", "&:hover": { backgroundColor: "#2e7d32" } }}
        startIcon={<Add />}
        onClick={() => handleOpen()}
      >
        Add Item
      </Button>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(135deg, #d32f2f, #ef5350)" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Button
                    sx={{ mr: 1, color: "#ff9800" }}
                    startIcon={<Edit />}
                    onClick={() => handleOpen(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#d32f2f" }}
                    startIcon={<Delete />}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Dialog for Adding/Editing */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingItem ? "Edit Item" : "Add Item"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Item Name"
            margin="dense"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            margin="dense"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <TextField
            fullWidth
            label="Category"
            margin="dense"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryManagementScreen;
