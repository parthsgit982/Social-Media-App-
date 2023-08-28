import { Box, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Friend from "../components/Friend";
import Wrapper from "../components/Wrapper";
import useStore from "../state/store";
import axios from "axios";

const Post = ({
  postId,
  postUserId,
  userName,
  description,
  location,
  picPath,
  userPicPath,
  likes,
}) => {
  const { token, setPost, user, setPosts } = useStore();
  const loggedInUserId = user._id;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const mainColor = useColorModeValue("gray.700", "gray.300");
  const primaryColor = "#319795";

  const getPosts = () => {
    axios
      .get("http://localhost:4000/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const posts = res.data;
        setPosts({ posts });
      })
      .catch((err) => console.log(err));
  };

  const patchLike = async () => {
    const response = await fetch(`http://localhost:4000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    setPost({ updatedPost });
    getPosts();
  };

  return (
    <Wrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        userName={userName}
        subtitle={location}
        userPicPath={userPicPath}
      />
      <Text color={mainColor} mt="1rem">
        {description}
      </Text>

      {picPath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:4000/assets/${picPath}`}
        />
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="0.5rem"
      >
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={patchLike}
            icon={
              isLiked ? (
                <AiFillHeart color={primaryColor} />
              ) : (
                <AiOutlineHeart />
              )
            }
          />
          <Text ml="0.5rem">{likeCount}</Text>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Post;
