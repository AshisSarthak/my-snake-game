import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons";
import { Box, Center, Container, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import "./legends.css";
import { DIRECTION } from "../../typings";

type LegendProps = {
  direction: DIRECTION;
};

const Legends = (props: LegendProps) => {
  const { direction } = props;

  const getArrowStyle = (key: DIRECTION) => {
    if (key === direction) {
      return {
        bg: "darkcyan",
        color: "white",
        transform: "scale(1.1)",
      };
    }
  };

  return (
    <Container mt="50px">
      <Grid>
        <GridItem colStart={0} colSpan={4}></GridItem>
        <GridItem colStart={5} colSpan={4}>
          <Center>
            <Box className="legends" {...getArrowStyle(DIRECTION.up)}>
              <ArrowUpIcon boxSize={"30px"} />
            </Box>
          </Center>
        </GridItem>
        <GridItem colStart={9} colSpan={4}></GridItem>
      </Grid>
      <Grid>
        <GridItem colStart={0} colSpan={4}>
          <Center>
            <Box className="legends" {...getArrowStyle(DIRECTION.left)}>
              <ArrowBackIcon boxSize={"30px"} />
            </Box>
          </Center>
        </GridItem>
        <GridItem colStart={5} colSpan={4}>
          <Center>
            <Box className="legends" {...getArrowStyle(DIRECTION.down)}>
              <ArrowDownIcon boxSize={"30px"} />
            </Box>
          </Center>
        </GridItem>
        <GridItem colStart={9} colSpan={4}>
          <Center>
            <Box className="legends" {...getArrowStyle(DIRECTION.right)}>
              <ArrowForwardIcon boxSize={"30px"} />
            </Box>
          </Center>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Legends;
