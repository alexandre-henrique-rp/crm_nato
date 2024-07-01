import {
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

interface SenhaProps {
  onvalue: any;
  setvalue: string;
}

export const SenhaComponent = ({ setvalue, onvalue }: SenhaProps) => {
  // function PasswordInput() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const handleonvalue = (e: any) => {
    e.preventDefault();
    const value: string = e.target.value;
    onvalue(value);
  };

  return (
    <>
      <InputGroup size="lg">
        <Input 
          pr="4.5rem"
          type={show ? "text" : "password"}
          value={setvalue}
          onChange={handleonvalue}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <FaEyeSlash /> : <IoEyeSharp />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};
