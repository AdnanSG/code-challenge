import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [services, setServices] = useState([
    { id: 1, name: 'Haircut', cost: 25, duration: 30, dailyLimit: 20, slotLimit: 2 },
    { id: 2, name: 'Beard Trim', cost: 15, duration: 20, dailyLimit: 30, slotLimit: 1 },
    { id: 3, name: 'Hair Coloring', cost: 50, duration: 60, dailyLimit: 10, slotLimit: 1 },
  ]);
  const [newService, setNewService] = useState({ name: '', cost: '', duration: '', dailyLimit: '', slotLimit: '' });
  const [editingId, setEditingId] = useState('');

  // Mock data for appointments
  const [appointments, setAppointments] = useState([
    { id: 1, serviceId: 1, day: 'Monday', time: '09:00' },
    { id: 2, serviceId: 2, day: 'Monday', time: '10:00' },
    { id: 3, serviceId: 1, day: 'Tuesday', time: '14:00' },
    { id: 4, serviceId: 3, day: 'Wednesday', time: '11:00' },
    { id: 5, serviceId: 1, day: 'Friday', time: '16:00' },
    { id: 6, serviceId: 2, day: 'Monday', time: '11:30' },
    { id: 7, serviceId: 1, day: 'Tuesday', time: '09:30' },
    { id: 8, serviceId: 3, day: 'Wednesday', time: '14:00' },
    { id: 9, serviceId: 2, day: 'Thursday', time: '10:00' },
    { id: 10, serviceId: 1, day: 'Thursday', time: '15:30' },
    { id: 11, serviceId: 3, day: 'Friday', time: '13:00' },
    { id: 12, serviceId: 2, day: 'Saturday', time: '11:00' },
    { id: 13, serviceId: 1, day: 'Saturday', time: '14:30' },
    { id: 14, serviceId: 3, day: 'Sunday', time: '12:00' },
    { id: 15, serviceId: 1, day: 'Sunday', time: '16:00' },
  ]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const addService = () => {
    if (
      newService.name.trim() !== '' &&
      newService.cost &&
      newService.duration &&
      newService.dailyLimit &&
      newService.slotLimit
    ) {
      setServices([...services, { ...newService, id: Date.now() }]);
      setNewService({ name: '', cost: '', duration: '', dailyLimit: '', slotLimit: '' });
    }
  };

  const removeService = (id) => {
    setServices(services.filter((service) => service.id !== id));
    setAppointments(appointments.filter((appointment) => appointment.serviceId !== id));
  };

  const startEditing = (id) => {
    setEditingId(id);
    const serviceToEdit = services.find((service) => service.id === id);
    setNewService({ ...serviceToEdit });
  };

  const saveEdit = (id) => {
    setServices(services.map((service) => (service.id === id ? { ...service, ...newService } : service)));
    setEditingId(null);
    setNewService({ name: '', cost: '', duration: '', dailyLimit: '', slotLimit: '' });
  };

  const getAvailableSlots = (day) => {
    const dayAppointments = appointments.filter((app) => app.day === day);
    const availableSlots = {};

    services.forEach((service) => {
      const serviceAppointments = dayAppointments.filter((app) => app.serviceId === service.id);
      const dailyAvailable = service.dailyLimit - serviceAppointments.length;
      const slotAvailable = service.slotLimit;
      availableSlots[service.id] = { dailyAvailable, slotAvailable };
    });

    return availableSlots;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Barber Shop Services
          </Typography>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Service name"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Cost"
              type="number"
              value={newService.cost}
              onChange={(e) => setNewService({ ...newService, cost: parseInt(e.target.value) })}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Duration (minutes)"
              type="number"
              value={newService.duration}
              onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) })}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Daily Limit"
              type="number"
              value={newService.dailyLimit}
              onChange={(e) => setNewService({ ...newService, dailyLimit: parseInt(e.target.value) })}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Slot Limit"
              type="number"
              value={newService.slotLimit}
              onChange={(e) => setNewService({ ...newService, slotLimit: parseInt(e.target.value) })}
              sx={{ mr: 1 }}
            />
            <Button variant="contained" onClick={addService}>
              Add Service
            </Button>
          </Box>
          <List>
            {services.map((service) => (
              <ListItem key={service.id}>
                {editingId === service.id ? (
                  <>
                    <TextField
                      value={newService.name}
                      onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                      sx={{ mr: 1 }}
                    />
                    <TextField
                      type="number"
                      value={newService.cost}
                      onChange={(e) => setNewService({ ...newService, cost: parseInt(e.target.value) })}
                      sx={{ mr: 1 }}
                    />
                    <TextField
                      type="number"
                      value={newService.duration}
                      onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) })}
                      sx={{ mr: 1 }}
                    />
                    <TextField
                      type="number"
                      value={newService.dailyLimit}
                      onChange={(e) => setNewService({ ...newService, dailyLimit: parseInt(e.target.value) })}
                      sx={{ mr: 1 }}
                    />
                    <TextField
                      type="number"
                      value={newService.slotLimit}
                      onChange={(e) => setNewService({ ...newService, slotLimit: parseInt(e.target.value) })}
                      sx={{ mr: 1 }}
                    />
                    <Button variant="contained" onClick={() => saveEdit(service.id)}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={`${service.name} - $${service.cost} - ${service.duration} minutes - Daily Limit: ${service.dailyLimit} - Slot Limit: ${service.slotLimit}`}
                    />
                    <IconButton edge="end" aria-label="edit" onClick={() => startEditing(service.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => removeService(service.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
          </List>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
            Weekly Calendar
          </Typography>
          <Grid container spacing={2}>
            {daysOfWeek.map((day) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={day}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" component="h3">
                    {day}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Available Slots:
                  </Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Service</TableCell>
                        <TableCell align="right">Daily</TableCell>
                        <TableCell align="right">Concurrent</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(getAvailableSlots(day)).map(([serviceId, { dailyAvailable, slotAvailable }]) => (
                        <TableRow key={serviceId}>
                          <TableCell>{services.find((s) => s.id === parseInt(serviceId)).name}</TableCell>
                          <TableCell align="right">{dailyAvailable}</TableCell>
                          <TableCell align="right">{slotAvailable}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                    Appointments Booked:
                  </Typography>
                  <List dense>
                    {appointments
                      .filter((app) => app.day === day)
                      .map((app) => (
                        <ListItem key={app.id}>
                          <ListItemText
                            primary={`${services.find((s) => s.id === app.serviceId)?.name} at ${app.time}`}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
