import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const ListExpenses = () => {
  const data = {
    labels: ['Debit', 'Cash', 'Credit'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          
        ],
        borderWidth: 1,
      },
    ],
  }
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
          slots= {{toolbar:GridToolbar}}
        ></DataGrid>
        <Grid item xs={6} sx = {{height:400,width:400}}>
        <Pie data={data} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
