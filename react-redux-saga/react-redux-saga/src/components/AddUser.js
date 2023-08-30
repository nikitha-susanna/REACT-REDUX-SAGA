import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewUser, updateUser } from "../redux/actions/users";


function AddUserDialog({ userData, show, close, isUpdate }) {
  useEffect(() => {
    const getLastFourMonths = () => {
      const currentDate = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const lastFourMonths = [];
      for (let i = 0; i < 4; i++) {
        currentDate.setMonth(currentDate.getMonth() - 1);
        const monthName = months[currentDate.getMonth()];
        lastFourMonths.push(monthName);
      }
      return lastFourMonths.reverse();
    };
    const monthNames = getLastFourMonths();
    setLastFourMonths(monthNames);

    if (userData) {
      const salesStatData = monthNames.map((month) => ({
        month: month,
        sales:
          isUpdate && userData.salesStat && userData.salesStat.find((item) => item.month === month)
            ? userData.salesStat.find((item) => item.month === month).sales
            : "",
      }));


      setdata({
        name: "",
        userName: "",
        email: "",
        salesStat: salesStatData,
      });

      setUpdateData({
        id: userData.id || "",
        name: userData.name || "",
        userName: userData.userName || "",
        email: userData.email || "",
        salesStat: salesStatData,
      });
    }
  }, [userData]);

  const dispatch = useDispatch();
  const [data, setdata] = useState({
    name: "",
    userName: "",
    email: "",
    salesStat: [],
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    userName: "",
    email: "",
    salesStat: [],
  });

  const [lastFourMonths, setLastFourMonths] = useState([]);

  const nameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const salesRef = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (isUpdate) {
      setUpdateData((prevdata) => ({
        ...prevdata,
        salesStat: prevdata.salesStat.map((item) =>
          item.month === name ? { ...item, sales: value } : item
        ),
      }));
    } else {
      setdata((prevdata) => ({
        ...prevdata,
        [name]: value,
        salesStat: prevdata.salesStat.map((item) =>
          item.month === name ? { ...item, sales: value } : item
        ),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isUpdate ? dispatch(updateUser(updateData, userData.id)) : dispatch(addNewUser(data));
    close();
  };

  const handleClear = () => {
    setdata({
      name: "",
      userName: "",
      email: "",
      salesStat: lastFourMonths.map((month) => ({ month: month, sales: "" })),
    });
    nameRef.current.value = "";
    userNameRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
    <div>
      <Dialog open={show} onClose={close}>
        <DialogTitle>
          {isUpdate ? "Update user Details" : "Add a new user"}
        </DialogTitle>
        <DialogContent>
          <TextField
            inputRef={nameRef}
            value={isUpdate ? updateData.name : data.name}
            onChange={handleInputChange}
            name="name"
            margin="dense"
            fullWidth
            type="text"
            placeholder="Name"
          />
          <TextField
            inputRef={userNameRef}
            value={isUpdate ? updateData.userName : data.userName}
            onChange={handleInputChange}
            name="userName"
            margin="dense"
            fullWidth
            type="text"
            placeholder="User Name"
          />
          <TextField
            inputRef={emailRef}
            value={isUpdate ? updateData.email : data.email}
            onChange={handleInputChange}
            name="email"
            margin="dense"
            fullWidth
            type="email"
            placeholder="Email"
          />

          {lastFourMonths.map((month, index) => (
            <TextField
              inputRef={salesRef}
              key={index}
              value={isUpdate ? updateData.salesStat[index]?.sales : data.salesStat[index]?.sales || ""}
              onChange={handleInputChange}
              name={month}
              margin="dense"
              fullWidth
              type="number"
              placeholder={`Sales for ${month}`}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="medium"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {isUpdate ? "Update" : "Add"}
          </Button>
          <Button
            variant="outlined"
            size="medium"
            color="error"
            onClick={(e) => {
              handleClear(e);
            }}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddUserDialog;
