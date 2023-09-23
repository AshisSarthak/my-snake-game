import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { ChangeEvent, useContext, useState } from "react";
import { SnakeGameContext } from "../../context/game-context";

const Login = () => {
  const { dispatch } = useContext(SnakeGameContext);
  const [userName, setUserName] = useState("");
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.currentTarget.value?.trim());
  };
  const handleLogin = () => {
    dispatch({
      type: "ADD_USER",
      payload: userName,
    });
  };
  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Card height="300px" width="400px">
        <CardHeader textAlign="center">
          <Heading size="md">Welcome to the Snake Game</Heading>
        </CardHeader>
        <Divider />
        <CardBody>
          <Input
            placeholder="Please Enter your Name to Continue"
            size="lg"
            onChange={handleNameChange}
          />
        </CardBody>
        <CardFooter alignItems="center" justifyContent="center">
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              isDisabled={!userName}
              onClick={handleLogin}
            >
              Login
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default Login;
