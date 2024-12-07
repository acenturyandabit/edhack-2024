import * as React from "react";
import { Typography } from "@mui/material";
import Layout from "../components/layout/Layout";

function Landing() {
  return (
    <Layout>
      <div>
        <Typography variant="h5" gutterBottom>
          Welcome to the Landing Page
        </Typography>
      </div>
    </Layout>
  );
}

export default Landing;
