import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { dummyData } from "../constants/dummyData";

const Tasks = ({ formData, updateFormData }) => {
  const [tasks, setTasks] = useState(dummyData);
  const [newTask, setNewTask] = useState("");
  const [checkedTasks, setCheckedTasks] = useState({});

  const addTaskHandler = (e) => {
    if (newTask === "") return;
    const newTaskObj = {
      id: Math.floor(Math.random() * 1000),
      label: newTask,
    };
    setTasks((prev) => [newTaskObj, ...prev]);
    setNewTask("");
  };

  const deleteHandler = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    const updatedCheckedTasks = { ...checkedTasks };
    delete updatedCheckedTasks[id];
    setCheckedTasks(updatedCheckedTasks);
    updateFormData({
      ...formData,
      tasks: updatedCheckedTasks,
    });
  };

  const checkedTaskHandler = (taskId, taskLabel) => {
    const updatedCheckedTasks = { ...checkedTasks };
    if (updatedCheckedTasks[taskId]) {
      delete updatedCheckedTasks[taskId];
    } else {
      updatedCheckedTasks[taskId] = taskLabel;
    }
    setCheckedTasks(updatedCheckedTasks);
    updateFormData({
      ...formData,
      tasks: updatedCheckedTasks,
    });
  };

  return (
    <form>
      <Typography variant="h5" align="center" mb={2}>
        Tasks
      </Typography>
      <Grid2 mb={2}>
        <Typography gutterBottom>Add a task</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Add task"
            fullWidth
            name="task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              p: 0.8,
              textTransform: "none",
              width: "84px",
            }}
            onClick={addTaskHandler}
          >
            Add
          </Button>
        </Box>
      </Grid2>

      <Box
        sx={{
          maxHeight: "320px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: (theme) => theme.palette.grey[400],
            borderRadius: "16px",
          },
          minWidth: "428px",
        }}
      >
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                    checked={!!checkedTasks[task.id]}
                    onChange={() => checkedTaskHandler(task.id, task.label)}
                  />
                }
                label={task.label}
              />
              <IconButton onClick={() => deleteHandler(task.id)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Grid2>
            <Divider sx={{ mt: 0.4, mb: 0.4, maxWidth: 412 }} />
          </React.Fragment>
        ))}
      </Box>
    </form>
  );
};

export default Tasks;
