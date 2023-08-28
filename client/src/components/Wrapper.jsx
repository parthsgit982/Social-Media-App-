import { Box, useColorMode } from "@chakra-ui/react";

const Wrapper = ({ children }) => {
  const { colorMode } = useColorMode();

  const backgroundColor = colorMode === "light" ? "gray.50" : "gray.700";

  return (
    <Box
      p={{ base: "1.25rem", md: "1.75rem" }}
      borderRadius="0.75rem"
      backgroundColor={backgroundColor}
      boxShadow="xl"
      color={colorMode === "light" ? "black" : "white"}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
