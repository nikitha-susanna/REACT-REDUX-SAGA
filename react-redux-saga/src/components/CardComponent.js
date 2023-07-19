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

function CardComponent(props) {
   const [sanckBar, setSnackBar] = useState({open:false, severity:''})
   const [message, setMessage] = useState('') 
   const dispatch = useDispatch();
   const deleteThisUser = () => {
      if ( props.users.length === 0 ){
         setSnackBar({...sanckBar,open:true, severity:'error'})
         setMessage('The user list is empty')
      } else {
         dispatch(deleteUser(props.users.id));
         setSnackBar({...sanckBar, open:true, severity:'success'})
         setMessage('User '+ props.users.name+ ' is successfully deleted')
      }
   };
   const handleClose = () => {
      setSnackBar({...sanckBar, open:false})
   }
  return (
    <div>
      <Snackbar 
         open={sanckBar.open} 
         autoHideDuration={10000} 
         handleClose={()=>{ handleClose() }}
         anchorOrigin={{vertical: 'top', horizontal: 'right' }} >
         <Alert  severity={sanckBar.severity} sx={{ width: "100%" }}>
            {message}
         </Alert>
      </Snackbar>
      <Card
        variant="outlined"
        sx={{ maxWidth: 300, m: "20px" }}
        orientation="horizontal"
      >
         <CardContent>
            <Typography variant="h6">{props.users.name}</Typography>
            <Typography gutterBottom variant="body2" component="p">
               {props.users.username}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
               {props.users.email}
            </Typography>
         </CardContent>
         <CardActions>
            <Button
               size="small"
               onClick={() => {
               deleteThisUser();
               }}
            >
            Delete
            </Button>
          {/* <Button size="small">Update</Button> */}
         </CardActions>
      </Card>
    </div>
  );
}

export default CardComponent;
