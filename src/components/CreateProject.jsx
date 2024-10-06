import AddIcon from "@mui/icons-material/Add";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import {
  Box,
  Grid2,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";

const CreateProject = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name, newVal) => {
    updateFormData({
      ...formData,
      [name]: newVal,
    });
  };

  return (
    <form>
      <Typography variant="h5" align="center" mb={2}>
        Create a Project
      </Typography>
      <Grid2 sx={{ mb: 2 }}>
        <Typography gutterBottom>Project name</Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Enter project name here"
          fullWidth
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
        />
      </Grid2>

      <Grid2 sx={{ mb: 2 }}>
        <Typography gutterBottom>Client</Typography>
        <Grid2 sx={{ display: "flex", gap: 1.6, alignItems: "center" }}>
          <Select
            value={formData.client}
            onChange={handleChange}
            size="small"
            name="client"
            fullWidth
            displayEmpty
            renderValue={(selected) => {
              if (selected === "") {
                return (
                  <Typography style={{ color: "#aaa" }}>
                    Select a client
                  </Typography>
                );
              }
              return selected;
            }}
          >
            <MenuItem value="Client1">Client 1</MenuItem>
            <MenuItem value="Client2">Client 2</MenuItem>
            <MenuItem value="Client3">Client 3</MenuItem>
          </Select>
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            Or
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="New Client"
            name="newClient"
            value={formData.newClient}
            onChange={handleChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AddIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
      </Grid2>

      <Grid2 sx={{ mb: 2 }}>
        <Typography gutterBottom>Dates</Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <DatePicker
            value={formData.startDate}
            onChange={(newVal) => handleDateChange("startDate", newVal)}
            renderInput={(params) => <TextField {...params} fullWidth />}
            slots={{ openPickerIcon: CalendarTodayOutlinedIcon }}
            slotProps={{
              textField: { size: "small" },
              inputAdornment: {
                position: "start",
              },
            }}
            format="dd/MM/yyyy"
          />
          <Typography sx={{ color: "#aaa" }}>-</Typography>
          <DatePicker
            value={formData.endDate}
            onChange={(newVal) => handleDateChange("endDate", newVal)}
            renderInput={(params) => <TextField {...params} fullWidth />}
            slots={{ openPickerIcon: CalendarTodayOutlinedIcon }}
            slotProps={{
              textField: { size: "small" },
              inputAdornment: {
                position: "start",
              },
            }}
            format="dd/MM/yyyy"
          />
        </Box>
      </Grid2>

      <Grid2>
        <Typography gutterBottom>Notes</Typography>
        <TextField
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          placeholder="Optional"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </Grid2>
    </form>
  );
};

export default CreateProject;
