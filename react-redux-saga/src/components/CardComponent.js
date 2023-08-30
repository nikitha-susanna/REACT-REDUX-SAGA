import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/actions/users";
import styles from "./mystyle.module.css";
import PerformanceStats from "./PerformanceStats";

function CardComponent({ users, show, isUpdate, setTheUserDetails }) {
  const [sanckBar, setSnackBar] = useState({ open: false, severity: "" });
  const [userDetails, setUserDetails] = useState({
    id: users.id ? users.id : "",
    name: users.name ? users.name : "",
    userName: users.userName ? users.userName : "",
    email: users.email ? users.email : "",
    salesStat: users.salesStat ? users.salesStat : ""
  });
  const [message, setMessage] = useState("");
  const [showSalesReport, setShowSalesReport] = useState(false);

  const dispatch = useDispatch();
  const deleteThisUser = () => {
    if (users.length === 0) {
      setSnackBar({ ...sanckBar, open: true, severity: "error" });
      setMessage("The user list is empty");
    } else {
      dispatch(deleteUser(users.id));
      setSnackBar({ ...sanckBar, open: true, severity: "success" });
      setMessage(
        "User " + users.name || users.userName + " is successfully deleted"
      );
    }
  };

  const updateThisUser = () => {
    console.log("--> updateinside card comp ", userDetails);
    setTheUserDetails(userDetails);
    isUpdate(true);
    show();
  };

  const handleClose = () => {
    setSnackBar({ ...sanckBar, open: false });
  };

  const showReports = () => {
    setShowSalesReport(true);
  };

  const closeReports = () => {
    setShowSalesReport(false);
  };

  return (
    <div>
      <Snackbar
        open={sanckBar.open}
        autoHideDuration={3000}
        handleClose={() => {
          handleClose();
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={sanckBar.severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Card
        sx={{ maxWidth: 400, m: "10px", minHeight: 150, maxHeight: 200 }}
        orientation="horizontal"
      >
        <CardContent
        className={styles.cursor}
          onClick={() => {
            showReports();
          }}
        >
          <Typography variant="h6">
            {users.name}
          </Typography>
          <Typography gutterBottom variant="body2" component="p">
            {users.userName}
          </Typography>
          <Typography gutterBottom variant="body2" component="p">
            {users.email}
          </Typography>
        </CardContent>
        <CardActions className={styles.cardActionAlignment}>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              updateThisUser();
            }}
            className={styles.cardActionButtons}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            size="medium"
            color="error"
            onClick={() => {
              deleteThisUser();
            }}
            className={styles.cardActionButtons}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      {showSalesReport &&
        <PerformanceStats
          openReport={showSalesReport}
          closeReport={closeReports}
          data={users.salesStat}
          userName={users.name}
        />}
    </div>
  );
}

export default CardComponent;
