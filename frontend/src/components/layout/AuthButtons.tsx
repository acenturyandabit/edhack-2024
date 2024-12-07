import { Button } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  return (
    <>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" onClick={() => alert("sign up")}>
        Sign up
      </Button>
    </>
  );
};

export default AuthButtons;
