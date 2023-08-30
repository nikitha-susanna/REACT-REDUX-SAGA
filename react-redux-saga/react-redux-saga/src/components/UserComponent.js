import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/users";
import AddUserDialog from "./AddUser";
import CardComponent from "./CardComponent";
import jsPDF from "jspdf";
import * as autoTable from "jspdf-autotable";
import styles from "./mystyle.module.css";
import ProgressBar from "./ProgressBar";
import OverAllReport from "./OverAllReport";
import { getCurrentDate } from "../functions/commonFunctions";

function UserComponent() {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  const [addUserButtonClicked, setAddUserButtonClicked] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    id: "",
    name: "",
    userName: "",
    email: "",
    salesStat: [{ month: "", sales: 0 }]
  });
  const [showOverAllReport, setShowOverAllReport] = useState(false);

  useEffect(
    () => {
      dispatch(getUsers());
    },
    [dispatch]
  );

  const openAddUserDialog = () => {
    setAddUserButtonClicked(true);
  };

  const closeAddUserDialog = () => {
    setAddUserButtonClicked(false);
  };

  const setTheUpdateFlag = value => {
    setIsUpdate(value);
  };

  const userDetailstoBeUpdated = data => {
    console.log('--> data in AdduserComp', data)
    setUpdateUser({
      id: data.id,
      name: data.name,
      userName: data.userName,
      email: data.email,
      salesStat: data.salesStat
    });
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const tableColumns = ["User", "User Name", "Email"];
    const tableData = users.map(user => [user.name, user.userName, user.email]);
    pdf.text("User List", 10, 10);
    pdf.autoTable({
      head: [tableColumns],
      body: tableData,
      theme: "grid"
    });
    pdf.save(`user_list_for ${getCurrentDate()}.pdf`);
  };

  const closeOverAllReport = () => {
    setShowOverAllReport(false);
  };

  return (
    <div>
      <h1 className={styles.heading}>Dashboard</h1>
      <Grid container direction="row" xl={12} spacing={1}>
        <Grid
          className={styles.userComponentListView}
          item
          container
          direction="column"
          md={10}
          xl={10}
        >
          <Grid container item>
            {users.length > 0 &&
              users.map(user =>
                <Grid item md={4} key={user.id}>
                  <CardComponent
                    users={user}
                    show={openAddUserDialog}
                    isUpdate={setTheUpdateFlag}
                    setTheUserDetails={userDetailstoBeUpdated}
                  />
                </Grid>
              )}
          </Grid>
          {users.length === 0 && <ProgressBar />}
        </Grid>
        <Grid item container direction="row" md={2} xl={2}>
          <Grid direction="column" container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => {
                  setAddUserButtonClicked(true);
                  setTheUpdateFlag(false);
                }}
              >
                Add User
              </Button>
              {addUserButtonClicked &&
                <AddUserDialog
                  show={addUserButtonClicked}
                  close={closeAddUserDialog}
                  isUpdate={isUpdate}
                  userData={updateUser}
                />}
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                onClick={() => {
                  handleDownloadPDF();
                }}
              >
                Download File
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="success"
                size="large"
                fullWidth
                onClick={() => {
                  setShowOverAllReport(true);
                }}
              >
                Over All Report
              </Button>
              <OverAllReport
                open={showOverAllReport}
                close={closeOverAllReport}
                userData={users}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserComponent;
