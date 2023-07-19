import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/users";
import CardComponent from "./CardComponent";

function UserComponent() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.length > 0 &&
        users.map((user) => (
          <CardComponent users={user} />
        ))}
      {users.length === 0 && <p> NO users</p>}
    </div>
  );
}

export default UserComponent;
