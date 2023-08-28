import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Input,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiEdit,
  FiLink,
  FiMessageSquare,
  FiPaperclip,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { z } from "zod";
import useStore from "../state/store";
import UserImage from "../components/UserImage";
import Wrapper from "../components/Wrapper";

const CreatePost = ({ picPath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const { user, token, setPosts } = useStore();
  const isDesktopScreen = useMediaQuery("(min-width: 1000px)");
  const mediumMain = "#00D5FA";

  const { colorMode } = useColorMode();

  const schema = z.object({
    post: z.string(),
    picture: z.any(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handlePost = async (formData) => {
    const newFormData = new FormData();
    newFormData.append("userId", user._id);
    newFormData.append("description", formData.post);
    if (image) {
      newFormData.append("picture", image);
      newFormData.append("picPath", image.name);
    }

    axios
      .post("http://localhost:4000/posts", newFormData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const posts = res.data;
        setPosts({ posts });
        setImage(null);
        reset({ post: "", picture: null });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <Flex direction="column" alignItems="center">
        <Flex justify="flex-start" align="center" mb="0.5rem" w="100%">
          <UserImage size="60px" image={picPath} />
          <Box flexGrow={1} ml="1rem">
            <Input
              placeholder="Write Somthing to Create Post..."
              {...register("post")}
              bg={colorMode === "light" ? "#F6F6F6" : "#1A202C"}
              borderRadius="2rem"
              padding="1.6rem 2rem"
              color={colorMode === "light" ? "black" : "white"}
              _placeholder={{
                color: colorMode === "light" ? "gray.500" : "gray.300",
              }}
            />
          </Box>
        </Flex>
        {isImage && (
          <Flex justify="space-between" alignItems="center">
            <Box
              as="label"
              htmlFor="picture"
              border={`2px dashed ${mediumMain}`}
              p="10px"
              w="100%"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              {!image ? (
                <p>
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    {...register("picture")}
                    display="block"
                    pt={"4px"}
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                </p>
              ) : (
                <Flex justify="space-between" align="center">
                  <Text>{image.name}</Text>
                  <FiEdit />
                </Flex>
              )}
            </Box>
            {image && (
              <IconButton
                onClick={() => setImage(null)}
                ml={2}
                icon={<FiTrash2 />}
              />
            )}
          </Flex>
        )}

        <Divider mt="1.25rem" mb="1.25rem" w="100%" />

        <Flex justify="space-around" align="center" w="100%">
          <Flex
            align="center"
            onClick={() => setIsImage(!isImage)}
            cursor="pointer"
            gap={1}
          >
            <FiLink color={mediumMain} />
            <Text color={mediumMain} ml="0.25rem">
              Image
            </Text>
          </Flex>

          <Button
            disabled={!(image || errors.post)}
            onClick={handleSubmit(handlePost)}
            color="white"
            backgroundColor="orange"
            borderRadius="3rem"
            marginLeft="1rem"
          >
            POST
          </Button>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default CreatePost;
