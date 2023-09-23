import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Code,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const Instructions = () => {
  return (
    <Card variant="outline" margin="5px">
      <CardHeader bgColor="darkcyan" color="white">
        <Center>
          <Heading size="md">Instructions</Heading>
        </Center>
      </CardHeader>
      <CardBody>
        <Stack direction="column">
          <Code
            colorScheme="yellow"
            children="Use Arrow Keys to move around the board"
          />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Instructions;
