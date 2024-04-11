/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet";
import { UserManagementView } from "@/sections/users/view";

function UserManagement() {
  return (
    <div>
      <Helmet>
        <title> UMS | User Management </title>
      </Helmet>
      <UserManagementView />
    </div>
  );
}

export default UserManagement;
