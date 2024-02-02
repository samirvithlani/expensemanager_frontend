import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const submitHandler = async (data) => {
    console.log(data);
    var user = Object.assign(data, { role: "65b9129042f4dedb0875639c" });
    console.log(user);

    try {
      const res = await axios.post("http://localhost:4000/api/user", user);
      console.log(res);
      console.log(res.data);

      toast.success('User created successfully..!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setTimeout(() => {
            navigate("/");
        },3000)
    } catch (error) {
        console.error(error);
        toast.error("Error in creating user");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("firstName")}
              ></TextField>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("lastName")}
              ></TextField>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("email")}
              ></TextField>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("password")}
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                SIGN UP
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
