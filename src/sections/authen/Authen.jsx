/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import useAuth from "@/hooks/useAuth";

function LoginGoogle() {
  const handleCredentialResponse = (response) => {
    Cookies.set("__token", response.credential);
    const authStore = useAuth.getState();
    document.getElementById("buttonDiv").hidden = true;
    authStore.login();
  };

  useEffect(() => {
    /* global google*/
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "338033181927-i87lcvpnude41h26u2q9b9leptnelka8.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
      });
      google.accounts.id.prompt();
    };
  }, []);

  return (
    <div className="min-h-screen grid place-items-center bg-[orange]">
      <div className="p-[50px] flex flex-col items-center bg-[#fff]">
        <h1 className="mb-[20px] font-extrabold">SIGN IN WITH GOOGLE</h1>
        <div id="buttonDiv"></div>
      </div>
    </div>
  );
}

export default LoginGoogle;
