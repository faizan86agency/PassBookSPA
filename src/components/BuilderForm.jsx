import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function BuilderForm() {
  const [rows, setRows] = useState(1); // Initialize with one row

  const addRow = () => {
    if (rows < 3) {
      setRows((prevRows) => prevRows + 1);
    }
  };

  const removeRow = () => {
    setRows((prevRows) => Math.max(prevRows - 1, 0)); // Ensure there's at least one row
  };

  return (
    <Card w="60%" p="5" m="5">
      <Heading>Generic pass builder</Heading>
      <Text fontSize="2xl">Header</Text>
      <Text>Logo (Image URL)</Text>
      <Input mb="5" />

      <Text>Card title</Text>
      <Input mb="5" />

      <Text fontSize="2xl">Top row</Text>
      <Text>Subheader</Text>
      <Input mb="5" />

      <Text>Header</Text>
      <Input mb="5" />

      <Text fontSize="2xl">Information rows</Text>

      {[...Array(rows)].map((_, index) => (
        <>
          <Text fontSize="lg">Row {index + 2}</Text>
          <Flex justify={"space-between"}>
            <Stack>
              <Text>Left label</Text>
              <Input mb="2" />

              <Text>Left label</Text>
              <Input mb="5" />
            </Stack>

            <Stack>
              <Text>Middle label</Text>
              <Input mb="2" />

              <Text>Middle label</Text>
              <Input mb="5" />
            </Stack>

            <Stack>
              <Text>Right label</Text>
              <Input mb="2" />

              <Text>Right label</Text>
              <Input mb="5" />
            </Stack>
          </Flex>
        </>
      ))}

      <Flex gap="3" mb="5">
        <Button onClick={addRow}>Add row</Button>
        <Button onClick={removeRow}>Remove last row</Button>
      </Flex>

      <Text fontSize="2xl">Barcode</Text>
      <Text>Barcode type</Text>
      <Select mb="5">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>

      <Text>Barcode alternate text</Text>
      <Input mb="5" />
      <Text fontSize="2xl">Pass appearance</Text>
      <Text>Background color</Text>
      <Flex alignItems={"center"} justifyContent={"center"} mb="5" gap="3">
        <Box
          borderRadius={"50%"}
          border={"1px solid #ddd"}
          w="30px"
          h="30px"
        ></Box>
        <Input placeholder="Colorcode" />
      </Flex>

      <Text>Hero image (image URL)</Text>
      <Input mb="5" />
    </Card>
  );
}
