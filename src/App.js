import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import CreateProject from "./components/CreateProject";
import ManageProject from "./components/ManageProject";
import ProjectView from "./components/ProjectView";
import Tasks from "./components/Tasks";

function App() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    projectName: "",
    client: "",
    newClient: "",
    startDate: null,
    endDate: null,
    notes: "",
    view: "",
    whoCanManage: "",
    tasks: {},
  });

  const handleNext = () => {
    localStorage.setItem("projectData", JSON.stringify(formData));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateFormData = (updatedData) => {
    setFormData(updatedData);
  };

  return (
    <Box
      sx={{
        maxWidth: 416,
        minHeight: activeStep === 1 || activeStep === 2 ? 512 : 560,
        margin: "0 auto",
        padding: "44px 44px 16px",
        boxShadow: 2,
        borderRadius: 2,
        position: "relative",
        mt:5
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          color: theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      {activeStep === 0 && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CreateProject formData={formData} updateFormData={updateFormData} />
        </LocalizationProvider>
      )}
      {activeStep === 1 && (
        <ProjectView formData={formData} updateFormData={updateFormData} />
      )}
      {activeStep === 2 && (
        <ManageProject formData={formData} updateFormData={updateFormData} />
      )}
      {activeStep === 3 && (
        <Tasks formData={formData} updateFormData={updateFormData} />
      )}
      {activeStep === 4 && <h1 style={{ textAlign: "center" }}>Completed</h1>}

      <Box
        sx={{
          position: "absolute",
          bottom: "16px",
          left: "44px",
          right: "44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            position: "relative",
          }}
        >
          <Button
            variant="text"
            startIcon={<ChevronLeftIcon sx={{ mr: -1 }} />}
            sx={{ textTransform: "none" }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              p: 0.8,
              textTransform: "none",
              width: "84px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            onClick={handleNext}
            disabled={activeStep === 4}
          >
            Next
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1.6,
          }}
        >
          <MobileStepper
            variant="dots"
            steps={6}
            position="static"
            activeStep={activeStep}
            sx={{
              maxWidth: 400,
              "& .MuiMobileStepper-dot": {
                width: 6,
                height: 6,
                backgroundColor: theme.palette.grey[300],
                mr: 0.5,
              },
              "& .MuiMobileStepper-dotActive": {
                width: 12,
                height: 6,
                borderRadius: "32%",
                backgroundColor: theme.palette.grey[600],
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
export default App;
