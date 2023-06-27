import { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    useMediaQuery,
    useTheme,
    Button
} from "@mui/material"
import EditOutlinedIcon  from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("This is a required field."),
    lastName: yup.string().required("This is a required field."),
    email: yup.string().email("Invalid Email Entered").required("This is a required field."),
    password: yup.string().required("This is a required field."),            //come change this
    location: yup.string().required("This is a required field."),
    occupation: yup.string().required("This is a required field."),
    picture: yup.string().required("This is a required field."),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email Entered").required("This is a required field."),
    password: yup.string().required("This is a required field."),            //come change this
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",            //come change this
    location: "",
    occupation: "",
    picture: ""
}

const initialValuesLogin = {
    email: "",
    password: ""
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        //allows to send form info with images. otherwise just use values directly.
        const formData = new FormData();
        for(let value in values) {
            formData.append(value, values[value]);
        }
        const picturePath_ = values.picture.name || "null.png";
        formData.append("picturePath", picturePath_);

        const savedUserResponse = await fetch(
            `${process.env.REACT_APP_BASE_URL}/auth/register`,
            {
                method: "POST",
                body: formData
            }
        );

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const loggedInUser = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedInUser) {
          dispatch(
            setLogin({
              user: loggedInUser.user,
              token: loggedInUser.token,
            })
          );
          navigate("/home");
        }
      };



    const handleFormSubmit = async (values, onSubmitProps) => {
        if(isLogin) await login(values, onSubmitProps);
        if(isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            { ({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                    >
                        {/* only register fields start */}
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={
                                        Boolean(touched.firstName) && Boolean(errors.firstName)
                                    }
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={
                                        Boolean(touched.occupation) && Boolean(errors.occupation)
                                    }
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                        setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                            <p>Add Picture Here</p>
                                            ) : (
                                            <FlexBetween>
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlinedIcon />
                                            </FlexBetween>
                                            )}
                                        </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                            )}
                        {/* only register fields end */}

                        {/* register login common fields start */}
                        
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />

                    </Box>
                        {/* register login common fields end */}

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                        }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>

                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}

                        </Typography>
                    </Box>
                </form>
            ) }
        </Formik>
    );
};

export default Form;