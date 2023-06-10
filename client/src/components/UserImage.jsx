import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "30%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3010/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;