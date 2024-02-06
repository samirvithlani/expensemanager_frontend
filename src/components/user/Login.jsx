import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const submitHandler = async (data) => {

    try{
    const res = await axios.post("http://localhost:4000/api/user/login", data);
    console.log(res);
      if(res.status===200){
        //localStorage.setItem("token",res.data.data.token);
        localStorage.setItem("id",res.data.id);
        toast.success("Login Success");
        setTimeout(() => {
          if(res.data.role.name ==="user"){
            navigate("/user/dashboard");
        }  
        }, 2000);
        
        
      }


    }catch(err){


      
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
        LOGIN
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
      LOGIN
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
