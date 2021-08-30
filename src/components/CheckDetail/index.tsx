import { Button, Flex, Text, Image } from "@chakra-ui/react";
import React from "react";
import NumberFormat from "react-number-format";

interface IParams {
  item: any;
  onBack: () => void;
  onChangeStatus: (item, status) => void;
}
const CheckDetail: React.FC<IParams> = ({ item, onBack, onChangeStatus }) => {
  return (
    <Flex pl="8" pt="8" direction="column" color="blue.500">
      <Flex width="90%">
        <Flex flex="1" direction="column">
          <Text>ACCOUNT</Text>
          <Text>{item._id}</Text>
        </Flex>
        <Flex flex="1" direction="column">
          <Text>AMOUNT</Text>

          <NumberFormat
            value={item.amount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={(value) => <Text>{value}</Text>}
          />
        </Flex>
      </Flex>

      <Flex mt="10">
        <Image height="200px" width="90%" src={item.checkUrl} />
      </Flex>

      <Flex width="90%" position="fixed" bottom="0" mb="20">
        <Button
          bg="white"
          borderColor="blue.500"
          borderWidth="1px"
          color="blue.500"
          flex="1"
          mr="20"
          onClick={() => onChangeStatus(item, 3)}
        >
          REJECT
        </Button>
        <Button
          bg="blue.500"
          color="white"
          flex="1"
          onClick={() => onChangeStatus(item, 2)}
        >
          ACCEPT
        </Button>
      </Flex>

      <Button
        bg="red.100"
        width="90%"
        position="fixed"
        bottom="0"
        mb="5"
        onClick={onBack}
      >
        CANCEL
      </Button>
    </Flex>
  );
};

export default CheckDetail;
