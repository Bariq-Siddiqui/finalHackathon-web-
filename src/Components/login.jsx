import * as yup from 'yup';
import './style.css';
import Grid from '@mui/material/Grid';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
    useHistory
} from 'react-router-dom';
import { GlobalContext } from '../context/Context';
import { useContext, useReducer } from "react";
import {signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";
const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .max(10, 'No more then 10')
      .required('Password is required'),
});
  
function Login(){
    let { dispatch } = useContext(GlobalContext);
    let history = useHistory();
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues:{
            email: '',
            password: ''
          },
          onSubmit: onSubmitFunction
    })
    function onSubmitFunction(values){
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            alert("SignIn Successfull")
            history.push("/dashboard")
      })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message)
        });
    }
    return(
        <div className="login">
            <Grid container spacing={2} alignItems="center" textAlign='center' padding='2%' justifyContent="center">
                <Grid item xs={11} sm={10} md={9} lg={8}>
                    <h1 style={{color: "purple"}}> LOG IN </h1>
                   <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Email"
                            variant="standard"
                            type = "email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}

                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            type="password"
                            id="filled-basic"
                            label="Password"
                            variant="standard"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}

                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        /><br /><br />
                        <Button  variant="contained" color="secondary" type="submit">Log in</Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}
export default Login;