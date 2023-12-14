import {
  Box,
  Button,
  Card,
  Flex,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/config";
import {
  BonifyFinFitness,
  BonifyLLC,
  SchufaBasisScore,
  SchufaLLC,
} from "../utils/passes";

import walletButton from "../assets/wallet-button.png";

const initFormState = {
  id: "",
  type: "",
  logoUrl: "",
  title: "",
  subheader: "",
  header: "",
  rows: [
    {
      left_label: "",
      left_value: "",
      middle_label: "",
      middle_value: "",
      right_label: "",
      right_value: "",
    },
  ],
  barcode: {
    isEnable: true,
    value: "",
    alternateText: "",
  },
  hexaBackground: "",
  heroImageUrl: "",
  details: [
    {
      title: "",
      body: "",
    },
  ],
};

export default function BuilderForm() {
  const [formData, setFormData] = useState(initFormState);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [url, setUrl] = useState("");

  const addRow = () => {
    if (formData?.rows?.length < 3) {
      let rows = [...formData?.rows];
      rows.push({
        left_label: "",
        left_value: "",
        middle_label: "",
        middle_value: "",
        right_label: "",
        right_value: "",
      });
      setFormData({
        ...formData,
        rows,
      });
    }
  };

  const removeRow = () => {
    let rows = [...formData?.rows];
    rows.pop();
    setFormData({
      ...formData,
      rows,
    });
  };

  const addDetail = () => {
    let details = [...formData?.details];
    details.push({
      title: "",
      body: "",
    });
    setFormData({
      ...formData,
      details,
    });
  };

  const removeDetail = () => {
    let details = [...formData?.details];
    details.pop();
    setFormData({
      ...formData,
      details,
    });
  };
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRowChange = (index, key, value) => {
    let rows = formData?.rows?.map((row, ind) => {
      if (ind === index) {
        return { ...row, [key]: value };
      } else {
        return row;
      }
    });
    setFormData({ ...formData, rows });
  };

  const handleDetailsChange = (index, key, value) => {
    let details = formData?.details?.map((detail, ind) => {
      if (ind === index) {
        return { ...detail, [key]: value };
      } else {
        return detail;
      }
    });
    setFormData({ ...formData, details });
  };

  const handleSubmit = () => {
    if (!formData.id) {
      toast({
        title: "Please fill the unique id feild",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    setUrl("");

    axios
      .post(`${BASE_URL}/create-pass`, formData)
      .then((res) => {
        const { saveUrl } = res.data;
        setUrl(saveUrl);
      })
      .catch((err) => {
        toast({
          title: "Unable to Generate Pass",
          description: "Something Went Wrong please review and try again",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    if (value === "schufaLLC") {
      setFormData(SchufaLLC);
    } else if (value == "bonifyFinFitness") {
      setFormData(BonifyFinFitness);
    } else if (value == "schufaBasisScore") {
      setFormData(SchufaBasisScore);
    } else if (value == "bonifyLLC") {
      setFormData(BonifyLLC);
    } else {
      setFormData(initFormState);
    }
  };

  return (
    <Card w="60%" p="5" m="5">
      <Heading>Generic pass builder</Heading>

      <Select placeholder="Select Pass Type" onChange={handleTypeChange}>
        <option value="schufaLLC">SCHUFA LLC</option>
        <option value="bonifyFinFitness">BONIFY FinFitness</option>
        <option value="schufaBasisScore">SCHUFA BASIS SCORE</option>
        <option value="bonifyLLC">BONIFY LLC</option>
      </Select>

      <Text>Unique ID</Text>
      <Input
        mb="5"
        placeholder="Enter Unique ID"
        name="id"
        value={formData?.id}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />

      <Text fontSize="2xl">Header</Text>
      <Text>Logo (Image URL)</Text>
      <Input
        mb="5"
        placeholder="Logo URL"
        name="logoUrl"
        value={formData?.logoUrl}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <Text>Card title</Text>
      <Input
        mb="5"
        placeholder="Card Title"
        name="title"
        value={formData?.title}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <Text fontSize="2xl">Top row</Text>
      <Text>Subheader</Text>
      <Input
        mb="5"
        placeholder="Sub Header"
        name="subheader"
        value={formData?.subheader}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <Text>Header</Text>
      <Input
        mb="5"
        placeholder="Header"
        name="header"
        value={formData?.header}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <Text fontSize="2xl">Information rows</Text>
      {formData?.rows.map((item, index) => (
        <React.Fragment key={index}>
          <Text fontSize="lg">Row {index + 2}</Text>
          <Flex justify={"space-between"}>
            <Stack>
              <Text>Left label</Text>
              <Input
                mb="2"
                placeholder="Label"
                name="left_label"
                value={item?.left_label}
                onChange={(e) => {
                  handleRowChange(index, e.target.name, e.target.value);
                }}
              />

              <Text>Left Value</Text>
              <Input
                mb="5"
                placeholder="Value"
                name="left_value"
                value={item?.left_value}
                onChange={(e) => {
                  handleRowChange(index, e.target.name, e.target.value);
                }}
              />
            </Stack>

            <Stack>
              <Text>Middle label</Text>
              <Input
                mb="2"
                placeholder="Label"
                name="middle_label"
                value={item?.middle_label}
                onChange={(e) => {
                  handleRowChange(index, e.target.name, e.target.value);
                }}
              />

              <Text>Middle Value</Text>
              <Input
                mb="5"
                placeholder="Value"
                name="middle_value"
                value={item?.middle_value}
                onChange={(e) => {
                  handleRowChange(index, e.target.name, e.target.value);
                }}
              />
            </Stack>
            <Stack>
              <Text>Right label</Text>
              <Input
                mb="2"
                placeholder="Label"
                name="right_label"
                value={item?.right_label}
                onChange={(e) => {
                  handleRowChange(index, e.target.name, e.target.value);
                }}
              />

              <Text>Right Value</Text>
              <Input
                mb="5"
                placeholder="Value"
                name="right_value"
                value={item?.right_value}
                onChange={(e) => {
                  handleRowChange(index, e.target.name, e.target.value);
                }}
              />
            </Stack>
          </Flex>
        </React.Fragment>
      ))}
      <Flex gap="3" mb="5">
        <Button
          onClick={addRow}
          colorScheme="green"
          isDisabled={formData?.rows?.length >= 3}
        >
          Add row
        </Button>
        <Button
          onClick={removeRow}
          colorScheme="red"
          isDisabled={formData?.rows?.length <= 0}
        >
          Remove last row
        </Button>
      </Flex>
      <Text fontSize="2xl">Barcode</Text>
      <FormLabel htmlFor="barcode-check">
        {formData?.barcode?.isEnable ? "Barcode Enabled" : "Barcode Disabled"}
      </FormLabel>
      <Switch
        id="barcode-check"
        size="md"
        isChecked={formData?.barcode?.isEnable}
        onChange={(e) => {
          let barcode = { ...formData?.barcode, isEnable: e.target.checked };
          handleChange("barcode", barcode);
        }}
      />
      {formData?.barcode?.isEnable && (
        <>
          <Text>Barcode Value</Text>
          <Input
            mb="5"
            placeholder="Barcode Value"
            name="value"
            value={formData?.barcode?.value}
            onChange={(e) => {
              let barcode = { ...formData?.barcode, value: e.target.value };
              handleChange("barcode", barcode);
            }}
          />
          <Text>Barcode alternate text</Text>
          <Input
            mb="5"
            placeholder="Barcode Alternate Text"
            name="alternateText"
            value={formData?.barcode?.alternateText}
            onChange={(e) => {
              let barcode = {
                ...formData?.barcode,
                alternateText: e.target.value,
              };
              handleChange("barcode", barcode);
            }}
          />
        </>
      )}
      <Text fontSize="2xl">Pass appearance</Text>
      <Text>Background color</Text>
      <Flex alignItems={"center"} justifyContent={"center"} mb="5" gap="3">
        <Box
          borderRadius={"50%"}
          border={"1px solid #ddd"}
          w="30px"
          h="30px"
          bgColor={formData?.hexaBackground || "#FFFFFF"}
        ></Box>
        <Input
          placeholder="Hexa Background"
          name="hexaBackground"
          value={formData?.hexaBackground}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </Flex>
      <Text>Hero image (image URL)</Text>
      <Input
        mb="5"
        placeholder="Hero Image Url"
        name="heroImageUrl"
        value={formData?.heroImageUrl}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <Text>Details Section</Text>
      {formData?.details?.map((detail, index) => {
        return (
          <React.Fragment key={index}>
            <Flex
              direction={"column"}
              shadow={"lg"}
              gap={"10px"}
              padding={"20px"}
              mb={5}
            >
              <Text>Title</Text>
              <Input
                placeholder="Title"
                name="title"
                value={detail?.title}
                onChange={(e) =>
                  handleDetailsChange(index, e.target.name, e.target.value)
                }
              />
              <Text>Body</Text>

              <Textarea
                placeholder="Body"
                name="body"
                value={detail?.body}
                onChange={(e) =>
                  handleDetailsChange(index, e.target.name, e.target.value)
                }
              />
            </Flex>
          </React.Fragment>
        );
      })}
      <Flex gap="3" mb="5">
        <Button onClick={addDetail} colorScheme="green">
          Add Details
        </Button>
        <Button
          onClick={removeDetail}
          colorScheme="red"
          isDisabled={formData?.details?.length <= 0}
        >
          Remove Last Details
        </Button>
      </Flex>
      {url && (
        <Box width={"40%"} m={"auto"} my={"30px"}>
          <a href={url}>
            <img src={walletButton} />
          </a>
        </Box>
      )}

      <Button
        m={"auto"}
        colorScheme="blue"
        onClick={handleSubmit}
        isLoading={loading}
      >
        Submit
      </Button>
    </Card>
  );
}
