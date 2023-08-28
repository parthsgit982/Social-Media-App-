import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  CloseIcon,
  EmailIcon,
  HamburgerIcon,
  QuestionIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../state/store";
import ColorModeSwitch from "../components/ColorModeSwitch";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [isDesktopScreen] = useMediaQuery("(min-width: 768px)");
  const { user, setLogout } = useStore();
  const { colorMode } = useColorMode();

  const textColor = { light: "gray.700", dark: "gray.200" };
  const bgColor = { light: "gray.100", dark: "gray.700" };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogout();
    toast({
      title: "Successful Logged-Out",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    navigate("/");
  };

  return (
    <Box
      bg={bgColor[colorMode]}
      color={colorMode === "dark" ? "white" : "black"}
      boxShadow="md"
      px={2}
    >
      <Flex justify="space-between" align="center" p="1rem" boxShadow="md">
        <Flex align="center">
          <Heading as="h1" size="lg">
            MediaX
          </Heading>
          {isDesktopScreen && (
            <InputGroup ml="4">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color={textColor[colorMode]} />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search.."
                border={"1px solid "}
                bg={colorMode === "light" ? "#F6F6F6" : "#1A202C"}
                borderRadius="2rem"
                padding="1rem 2rem"
                color={colorMode === "light" ? "black" : "white"}
                _placeholder={{
                  color: colorMode === "light" ? "gray.500" : "gray.300",
                }}
              />
            </InputGroup>
          )}
        </Flex>

        {isDesktopScreen ? (
          // Display elements for desktop screens
          <Flex align="center" gap={2}>
            <ColorModeSwitch />
            <Menu size={"sm"}>
              <MenuButton
                as={Button}
                size={"sm"}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
                colorScheme={colorMode === "dark" ? "gray" : "blue"}
              >
                {user?.userName}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Log-Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          // Display only the hamburger icon for mobile screens
          <IconButton
            icon={<HamburgerIcon />}
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            ml="4"
            colorScheme={colorMode === "dark" ? "gray" : "blue"}
          />
        )}
      </Flex>
      {/* Mobile menu list */}
      {isMobileMenuToggled && !isDesktopScreen && (
        <Box
          position="fixed"
          top="0px"
          right="0"
          height="21%"
          zIndex="10"
          width="25%"
          bg={colorMode === "dark" ? "gray.700" : "white"}
          px="4"
          pt="2"
          border={"1px groove "}
          borderRadius={7}
          shadow={"2xl"}
        >
          <Flex justify="flex-end">
            <IconButton
              size={"xs"}
              icon={<CloseIcon />}
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              colorScheme={colorMode === "dark" ? "gray" : "blue"}
            />
          </Flex>
          <Flex
            flexDirection="column"
            alignItems={"center"}
            gap={4}
            mt="2"
            spacing="2"
          >
            <ColorModeSwitch />
            <Menu>
              <MenuButton
                size={"sm"}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
                colorScheme={colorMode === "dark" ? "gray" : "blue"}
              >
                {user.userName}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Log-Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
