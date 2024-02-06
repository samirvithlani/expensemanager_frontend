import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const ListExpenses = () => {
  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "mode", headerName: "Mode", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
  ];
  const [expenses, setexpenses] = useState([]);

  const getExpenses = async () => {
    const userId = localStorage.getItem("id"); // aftr login..
    const res = await axios.get(`http://localhost:4000/api/expense/${userId}`);
    console.log(res.data.data);
    setexpenses(res.data.data);
  };
  useEffect(() => {
    getExpenses();
  }, []);
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container spacing={2}>
        <DataGrid
          columns={columns}
          rows={expenses}
          getRowId={(row) => row._id}
        ></DataGrid>
      </Grid>
    </ThemeProvider>
  );
};
