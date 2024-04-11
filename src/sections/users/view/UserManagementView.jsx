/* eslint-disable no-unused-vars */
import React from "react";
import UserList from "@/sections/users/UserList";
import Title from "@/sections/users/Title";

function UserManagementView() {
  return (
    <div className="p-5">
      <Title />
      <UserList />
    </div>
  );
}

export default UserManagementView;
