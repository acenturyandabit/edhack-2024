import * as React from "react";
import { Typography, Button } from "@mui/material";
import Layout from "../components/layout/Layout";
import imgUrl from "./calcito.webp";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    // <Layout>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ flex: 1 , paddingLeft: "30px"}}>
        <Typography
          variant="h1"
          style={{ fontFamily: "Merriweather, serif" }}
          gutterBottom
        >
          Calcito
        </Typography>
        <Typography
          variant="h4"
          style={{ fontFamily: "Merriweather, serif", fontStyle: "italic" }}
          gutterBottom
        >
          Math made simple, Questions made smart 🪄
        </Typography>
        <Button variant="contained" onClick={() => navigate("/userRank")}>
          Login as parent
        </Button>
        <br></br>
        <br></br>
        <Button variant="contained" onClick={() => navigate("/serveQuestion")}>
          Login as student
        </Button>
      </div>
      <div style={{ flex: 1 }}>
        <img src={imgUrl} style={{ width: "100%" }} alt="Calcito" />
      </div>
    </div>
    // </Layout>
  );
}

export default Landing;
