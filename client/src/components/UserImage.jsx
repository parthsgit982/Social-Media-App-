import { Box, Image } from "@chakra-ui/react";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box
      width={size}
      height={size}
      borderRadius="50%"
      overflow="hidden"
      boxShadow="md"
    >
      <Image
        objectFit="cover"
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:4000/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
