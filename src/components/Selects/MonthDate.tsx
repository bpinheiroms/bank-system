import { Flex, Icon, Text } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { MdKeyboardArrowDown } from "react-icons/md";

const MonthDate = () => {
  const [startDate, setStartDate] = useState(new Date());

  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button>
      <Flex onClick={onClick} align="flex-end">
        <Text fontSize="2xl" color="white" size="lg" ref={ref}>
          {value}
        </Text>
        <Icon as={MdKeyboardArrowDown} w={8} h={8} />
      </Flex>
    </button>
  ));

  return (
    <Flex width="180px" align="flex-end">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<CustomInput />}
        showMonthYearPicker
        dateFormat="MMMM, yyyy"
      ></DatePicker>
    </Flex>
  );
};

export default MonthDate;
