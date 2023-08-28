import { Box, Divider, useMediaQuery } from "@chakra-ui/react";
import useStore from "../state/store";
import NavBar from "../global/NavBar";
import UserWidget from "../Fragments/UserWidget";
import CreatePost from "../Fragments/CreatePost";
import FriendsList from "../Fragments/FriendsList";
import AllPosts from "../Fragments/AllPosts";

const HomePage = () => {
  const [isDesktopScreen] = useMediaQuery("(min-width: 1000px)");
  const { user } = useStore();
  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isDesktopScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isDesktopScreen ? "26%" : undefined}>
          <UserWidget userId={user?._id} picPath={user?.picPath} />
        </Box>
        <Box
          flexBasis={isDesktopScreen ? "42%" : undefined}
          mt={isDesktopScreen ? undefined : "2rem"}
        >
          <CreatePost picPath={user.picPath} />
          <Divider my="1rem" />
          <AllPosts userId={user._id} />
        </Box>
        {isDesktopScreen && (
          <Box flexBasis="26%">
            <FriendsList userId={user._id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
