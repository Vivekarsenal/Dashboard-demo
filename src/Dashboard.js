import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton, InputBase } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const Dashboard = () => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [
      {
        name: 'CSPM Executive Dashboard',
        widgets: [
          { id: 1, name: 'Widget 1', text: 'Some text for widget 1' },
          { id: 2, name: 'Widget 2', text: 'Some text for widget 2' },
        ],
      },
    ];
  });

  const [open, setOpen] = useState(false);
  const [newWidget, setNewWidget] = useState({ name: '', text: '' });
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleClickOpen = (categoryIndex) => {
    setCurrentCategory(categoryIndex);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddWidget = () => {
    if (currentCategory !== null) {
      const updatedCategories = [...categories];
      const newWidgetData = {
        id: Math.random(),
        name: newWidget.name,
        text: newWidget.text,
      };
      updatedCategories[currentCategory].widgets.push(newWidgetData);
      setCategories(updatedCategories);
      setNewWidget({ name: '', text: '' });
      handleClose();
    }
  };

  const handleDeleteWidget = (categoryIndex, widgetId) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].widgets = updatedCategories[categoryIndex].widgets.filter(widget => widget.id !== widgetId);
    setCategories(updatedCategories);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget => widget.name.toLowerCase().includes(searchQuery.toLowerCase())),
  }));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dynamic Dashboard
      </Typography>

      <Paper component="form" style={{ marginBottom: '20px', padding: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
        <SearchIcon />
        <InputBase
          placeholder="Search Widgets"
          inputProps={{ 'aria-label': 'search widgets' }}
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </Paper>

      {filteredCategories.map((category, index) => (
        <div key={index}>
          <Typography variant="h6" gutterBottom>
            {category.name}
            <Button variant="contained" color="primary" onClick={() => handleClickOpen(index)} style={{ marginLeft: '20px' }}>
              + Add Widget
            </Button>
          </Typography>
          <Grid container spacing={2}>
            {category.widgets.map((widget) => (
              <Grid item xs={12} sm={6} md={4} key={widget.id}>
                <Paper elevation={3} style={{ padding: '20px', position: 'relative' }}>
                  <Typography variant="subtitle1">
                    {widget.name}
                  </Typography>
                  <Typography variant="body2">
                    {widget.text}
                  </Typography>
                  <IconButton
                    onClick={() => handleDeleteWidget(index, widget.id)}
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Widget</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details for the new widget.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Widget Name"
            fullWidth
            value={newWidget.name}
            onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Widget Text"
            fullWidth
            value={newWidget.text}
            onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddWidget} color="primary">
            Add Widget
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
