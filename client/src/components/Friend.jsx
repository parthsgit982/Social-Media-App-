import { Box, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import UserImage from "../components/UserImage";
import useStore from "../state/store";

const Friend = ({ friendId, userName, subtitle, userPicPath }) => {
  const { setFriends, token, user } = useStore();
  const friends = user.friends;
  const mainColor = useColorModeValue("gray.700", "gray.300");
  const primaryLight = "#A3E3F1";

  const isFriend = friends?.find((friend) => friend._id === friendId);

  const patchFriend = () => {
    axios
      .patch(
        `http://localhost:4000/users/${user._id}/${friendId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const friends = res.data;
        setFriends(friends);
      })
      .catch((error) => {
        console.error("Error patching friend:", error);
      });
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center" gap="1rem">
        <UserImage image={userPicPath} size="55px" />
        <Box>
          <Text
            color={mainColor}
            fontWeight="500"
            fontSize="1.25rem"
            _hover={{ color: primaryLight, cursor: "pointer" }}
          >
            {userName}
          </Text>
          <Text color="gray.500" fontSize="0.75rem">
            {subtitle}
          </Text>
        </Box>
      </Box>
      <IconButton
        onClick={patchFriend}
        backgroundColor={primaryLight}
        p="0.6rem"
      >
        {isFriend ? (
          <FaUserMinus color={"red"} />
        ) : (
          <FaUserPlus color={"black"} />
        )}
      </IconButton>
    </Box>
  );
};

export default Friend;
