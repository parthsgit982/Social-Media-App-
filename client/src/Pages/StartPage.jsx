import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";

const StartPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = { light: "#F0F0F0", dark: "#1E1E1E" };
  const headingColor = { light: "purple.600", dark: "teal.300" };
  const textColor = { light: "gray.700", dark: "white" };
  const buttonBgColor = { light: "purple.600", dark: "teal.300" };

  const [showLogin, setShowLogin] = useState(true);

  return (
    <Box bg={bgColor[colorMode]} minHeight="100vh">
      <Flex
        justifyContent="space-between"
        p={4}
        bg={colorMode === "light" ? "#FFFFFF" : "#121212"}
        color={textColor[colorMode]}
        boxShadow="xl"
        alignItems={"center"}
        borderBottom={"1px groove"}
      >
        <Box></Box>
        <Heading as="h1" size="xl" color={headingColor[colorMode]}>
          MediaX
        </Heading>
        <IconButton
          aria-label="Toggle Dark Mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </Flex>
      <Box p={8} maxWidth="lg" margin="0 auto">
        {showLogin ? <LoginForm /> : <RegisterForm />}
        <Box textAlign="center" mt={4}>
          {showLogin ? (
            <Text>
              Don't have an account?{" "}
              <Text
                as="span"
                color={buttonBgColor[colorMode]}
                cursor="pointer"
                onClick={() => setShowLogin(false)}
              >
                Register
              </Text>
            </Text>
          ) : (
            <Text>
              Already have an account?{" "}
              <Text
                as="span"
                color={buttonBgColor[colorMode]}
                cursor="pointer"
                onClick={() => setShowLogin(true)}
              >
                Login
              </Text>
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StartPage;
