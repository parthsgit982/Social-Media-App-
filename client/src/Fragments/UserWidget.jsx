import {
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineLocationOn, MdWorkOutline } from "react-icons/md";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../state/store";
import UserImage from "../components/UserImage";
import Wrapper from "../components/Wrapper";

const UserWidget = ({ userId, picPath }) => {
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { token, user } = useStore();
  const textColor = useColorModeValue("gray.800", "gray.200");

  const getUser = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `http://localhost:4000/users/${userId}`,
        { headers }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    // setInterval(() => {
    // getUser();
    // }, 1000);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const { userName, location, occupation, friends } = user;

  return (
    <Wrapper>
      <Flex
        direction="column"
        color={textColor}
        borderRadius="lg"
        p={4}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="md"
        _hover={{ cursor: "pointer" }}
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <Flex align="center" justify="center" mb="3">
          <UserImage image={picPath} size="80px" />
        </Flex>
        <Heading
          as="h4"
          size="md"
          textAlign="center"
          _hover={{ color: "purple.500" }}
        >
          {userName}
        </Heading>
        <Text textAlign="center">{friends?.length} friends</Text>
        <Divider my="3" />
        <Flex direction="column" gap="1">
          <Flex align="center">
            <Icon as={MdOutlineLocationOn} fontSize="xl" color="gray.400" />
            <Text ml="2">{location}</Text>
          </Flex>
          <Flex align="center">
            <Icon as={MdWorkOutline} fontSize="xl" color="gray.400" />
            <Text ml="2">{occupation}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default UserWidget;
