import { Box, useTheme, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
      <Box>
        {/* upper nav section start */}
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            >
              Trendr
          </Typography>
        </Box>
        {/* upper nav section end */}

        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          border-radius="1.7rem"
          backgroundColor={theme.palette.background.alt}
          p="2rem"
          m="2rem auto"
        >
          <Typography
            fontWeight="400"
            variant="h5"
            sx={{mb: "1.7rem"}}
          >
            Wanna see what's Trending? <br />Join Trendr!
          </Typography>

          <Form />

        </Box>

      </Box>
    );
  };
  
  export default LoginPage;