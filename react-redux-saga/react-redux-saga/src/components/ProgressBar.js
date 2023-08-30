import React from "react";
import { CircularProgress, Grid } from "@mui/material";

function ProgressBar(props) {
  return (
    <div>
      <Grid
        container
        spacing={2}
        alignItems="center" // Vertically center the items
        justifyContent="center" // Horizontally center the items
        style={{ height: "500px" }} // Set a fixed height for the container
      >
        <Grid item>
          <CircularProgress size={100} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProgressBar;
