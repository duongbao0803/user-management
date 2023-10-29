import { useEffect } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginGoogle() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);

    var decoded = jwtDecode(response.credential);
    console.log("check decode", decoded);
    setUser(decoded);
    document.getElementById("buttonDiv").hidden = true;
    navigate("/home");
  };
  const handleLogOut = (e) => {
    setUser({});
    document.getElementById("buttonDiv").hidden = false;
    navigate("/");
  };
  useEffect(() => {
    /* global google*/
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "338033181927-i87lcvpnude41h26u2q9b9leptnelka8.apps.googleusercontent.com",
        //cliend_id này đang là của t, m vô google cloud tạo 1 cái mới đi
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  return (
    <>
      <div id="buttonDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={handleLogOut}>logout</button>
      )}
      {user && (
        <div>
          <h5>{user.name}</h5>
          <h5>{user.img}</h5>
        </div>
      )}
    </>
  );
}
export default LoginGoogle;
