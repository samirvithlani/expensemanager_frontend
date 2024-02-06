import { Button } from "@mui/base";
import {
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

export const AddExpense = () => {
  const defaultTheme = createTheme();
  const { register, handleSubmit } = useForm();
  const [expCategory, setexpCategory] = useState([]);
  const [categoyId, setcategoyId] = useState("");
  const [mode, setmode] = useState("");

  const handleChange = (event) => {
    console.log("category..", event.target.value);
    setcategoyId(event.target.value);
  };
  const handleChangeMode = (event) => {
    console.log("mode..", event.target.value);
    setmode(event.target.value);
  };

  const getExpenseCategory = async () => {
    const res = await axios.get("http://localhost:4000/api/expense-category");
    console.log(res);
    setexpCategory(res.data.data);
  };

  useEffect(() => {
    getExpenseCategory();
  }, []);

  const submitHandler = async (data) => {
    const userId = localStorage.getItem("id");
    var expenseData = {
      title: data.title,
      amount: data.amount,
      category: categoyId,
      user: userId,
      mode: mode,
    };
    console.log("expenseData", expenseData);
    const res = await axios.post(
      "http://localhost:4000/api/expense",
      expenseData
    );
    if(res.status===201){
        
        toast.success("Expense Added Successfully");
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Typography
        variant="h2"
        align="center"
        color="textPrimary"
        sx={{ color: "blue", mt: 2, fontFamily: "Lato" }}
      >
        ADD EXPENSE
      </Typography>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <CssBaseline />
      <Grid
        container
        spacing={2}
        width="100%"
        sx={{
          borderRadius: "8px",
          mt: 2,
          ml: 0.1,
          p: 2,
        }}
      >
        <Grid
          item
          container
          style={{ height: "100vh", backgroundColor: "white", display: "flex" }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{ ml: 1 }}
            style={{ backgroundColor: "" }}
          >
            <Box component="form" onSubmit={handleSubmit(submitHandler)}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("title")}
              ></TextField>
              <TextField
                label="amount"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("amount")}
              ></TextField>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  onChange={handleChange}
                >
                  {/* <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                  {expCategory?.map((category) => {
                    return (
                      <MenuItem value={category._id}>{category.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  onChange={handleChangeMode}
                >
                  <MenuItem value={"cash"}>Cash</MenuItem>
                  <MenuItem value={"credit"}>Credit</MenuItem>
                  <MenuItem value={"debit"}>Debit</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                LOGIN
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
