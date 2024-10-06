import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";

const ProjectView = ({ formData, updateFormData }) => {
  const theme = useTheme();
  const [activeView, setActiveView] = useState({
    list: false,
    board: false,
  });

  const viewHandler = (val) => {
    setActiveView({
      list: val === "list",
      board: val === "board",
    });
    updateFormData({
      ...formData,
      view: val,
    });
  };

  const getCardStyle = (isActive) => ({
    borderColor: isActive
      ? theme.palette.primary.main
      : theme.palette.grey[300],
    borderWidth: "1.6px",
  });

  const getIconStyle = (isActive) => ({
    color: isActive ? theme.palette.grey[700] : theme.palette.grey[500],
    fontSize: "80px",
    padding: "20px 60px",
  });

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Select a view
      </Typography>
      <Typography
        variant="body2"
        align="center"
        mb={4}
        sx={{ color: theme.palette.grey[500] }}
      >
        You can also customize this views in settings
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 22,
          cursor: "pointer",
        }}
      >
        <Box onClick={() => viewHandler("list")}>
          <Card variant="outlined" sx={getCardStyle(activeView.list)}>
            <ListAltOutlinedIcon sx={getIconStyle(activeView.list)} />
          </Card>
          <Typography
            sx={{
              textAlign: "center",
              mt: 1,
              color: activeView.list
                ? theme.palette.grey[800]
                : theme.palette.grey[500],
            }}
          >
            List
          </Typography>
        </Box>
        <Box onClick={() => viewHandler("board")}>
          <Card variant="outlined" sx={getCardStyle(activeView.board)}>
            <AutoAwesomeMosaicOutlinedIcon
              sx={getIconStyle(activeView.board)}
            />
          </Card>
          <Typography
            sx={{
              textAlign: "center",
              mt: 1,
              color: activeView.board
                ? theme.palette.grey[800]
                : theme.palette.grey[500],
            }}
          >
            Board
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProjectView;
