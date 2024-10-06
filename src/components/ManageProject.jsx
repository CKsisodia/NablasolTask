import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

const ManageProject = ({ formData, updateFormData }) => {
  const theme = useTheme();
  const [canManage, setCanManage] = useState({
    everyone: false,
    admin: false,
    specific: false,
  });

  const manageProjectHandler = (val) => {
    setCanManage({
      everyone: val === "everyone",
      admin: val === "admin",
      specific: val === "specific",
    });
    updateFormData({
      ...formData,
      whoCanManage: val,
    });
  };

  const getCardStyle = (isActive) => ({
    borderColor: isActive
      ? theme.palette.primary.main
      : theme.palette.grey[200],
    borderWidth: "1.6px",
    mb: 1.2,
    padding: "8px 24px 8px 12px",
    backgroundColor: theme.palette.grey[50],
    display: "flex",
    alignItems: "center",
    gap: 2,
    minHeight: "72px",
    transition: "border-color 0.3s ease",
  });

  const getIconStyle = (isActive) => ({
    color: isActive ? theme.palette.grey[700] : theme.palette.grey[500],
    fontSize: "28px",
  });

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Who can manage projects
      </Typography>
      <Typography
        variant="body2"
        align="center"
        mb={4}
        sx={{ color: theme.palette.grey[500] }}
      >
        Don't panic - You can also customize this permissions in settings
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        <Card
          variant="outlined"
          sx={getCardStyle(canManage.everyone)}
          onClick={() => manageProjectHandler("everyone")}
        >
          <AppsOutlinedIcon sx={getIconStyle(canManage.everyone)} />
          <Box>
            <Typography>Everyone</Typography>
            <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
              All users can now to see it, but guests cannot access the
              projects.
            </Typography>
          </Box>
        </Card>

        <Card
          variant="outlined"
          sx={getCardStyle(canManage.admin)}
          onClick={() => manageProjectHandler("admin")}
        >
          <AccountCircleOutlinedIcon sx={getIconStyle(canManage.admin)} />
          <Box>
            <Typography>Only Admin's</Typography>
            <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
              Only admin can manage everything.
            </Typography>
          </Box>
        </Card>
        <Card
          variant="outlined"
          sx={getCardStyle(canManage.specific)}
          onClick={() => manageProjectHandler("specific")}
        >
          <PeopleOutlineIcon sx={getIconStyle(canManage.specific)} />
          <Box>
            <Typography>Only to Specific people</Typography>
            <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
              Only to some specific people can able to see it.
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default ManageProject;
