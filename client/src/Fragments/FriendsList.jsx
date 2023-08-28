import React, { useEffect } from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Friend from "../components/Friend";
import Wrapper from "../components/Wrapper";
import useStore from "../state/store";

const FriendsList = ({ userId }) => {
  const { setFriends, token, user } = useStore();
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:4000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const friends = await response.json();
    setFriends(friends);
  };

  useEffect(() => {
    getFriends();
  }, []);

  const mainColor = useColorModeValue("#333333", "#A3A3A3");

  return (
    <Wrapper>
      <Text color={mainColor} fontSize="xl" fontWeight="semibold" mb="1.5rem">
        Friend List
      </Text>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {user?.friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            userName={friend.userName}
            subtitle={friend.occupation}
            userPicPath={friend.picPath}
          />
        ))}
      </Box>
    </Wrapper>
  );
};

export default FriendsList;
