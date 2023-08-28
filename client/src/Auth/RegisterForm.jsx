import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string(),
  picture: z.any(),
  location: z.string(),
  occupation: z.string(),
});

const RegisterForm = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = (formData) => {
    const sendData = new FormData();
    for (const key in formData) sendData.append(key, formData[key]);
    sendData.append("picPath", formData.picture.name);

    setLoading(true);
    axios
      .post("http://localhost:4000/auth/register", sendData)
      .then((res) => {
        setLoading(false);
        reset();
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      })
      .catch((err) => {
        toast({
          title: "Registration Failed!",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit((formData) => submitHandler(formData))}
    >
      <Box
        as={VStack}
        spacing={1}
        px={6}
        py={4}
        border={"1px groove"}
        boxShadow="2xl"
        borderRadius="lg"
        bg={colorMode === "light" ? "white" : "gray.700"}
        color={colorMode === "light" ? "black" : "white"}
      >
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input {...register("userName")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input {...register("email")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input {...register("location")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Occupation</FormLabel>
          <Input {...register("occupation")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Profile Picture</FormLabel>
          <Input
            type="file"
            accept=".jpg, .jpeg, .png, .webp"
            onChange={(event) => setValue("picture", event.target.files[0])}
            borderWidth="1px"
            borderColor="gray"
            borderRadius="md"
            pt={"5px"}
            _focus={{
              borderColor: "purple.500",
              boxShadow: "outline",
            }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              {...register("password")}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          mt={2}
          width="100%"
          colorScheme="purple"
          size="md"
          type="submit"
          isLoading={isLoading}
        >
          Register
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
