import { ReactNode } from "react";
import Header from "./Header";
import { Box } from "@mui/material";
import * as React from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ height: "100hv" }}>
      <Header />
      <Box
        sx={{
          height: "calc(100vh - 65px)",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
