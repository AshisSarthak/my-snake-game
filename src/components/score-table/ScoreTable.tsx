import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

interface ScoreTableProps {
  header: string;
  caption?: string;
  columns: Array<any>;
  rows: Array<any>;
  addMedals?: boolean;
}

const ScoreTable = (props: ScoreTableProps) => {
  const { header, columns, rows, caption, addMedals = false } = props;

  const renderHeaders = () => {
    return columns.map((column, index) => (
      <Th key={`${column}_${index}`}>{column.title}</Th>
    ));
  };

  const getRowColor = (index: number) => {
    if (addMedals) {
      if (index === 0) {
        return "gold";
      }
      if (index === 1) {
        return "silver";
      }
      if (index === 2) {
        return "bronze";
      }
      return "";
    }
    return "";
  };

  return (
    <Card variant="outline" margin="5px" borderRadius="4px">
      <CardHeader bgColor="darkcyan" color="white">
        <Center>
          <Heading size="md">{header}</Heading>
        </Center>
      </CardHeader>
      <CardBody>
        <Table variant="simple">
          {caption && <TableCaption>{caption}</TableCaption>}
          <Thead>{renderHeaders()}</Thead>
          <Tbody>
            {rows?.map((row, index) => (
              <Tr key={`${index}`} bg={getRowColor(index)}>
                {columns.map((column, index) => (
                  <Td key={`${column}_${index}`}>{row[column.key]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ScoreTable;
