import { FormEvent, useEffect, useState } from "react";

type Props = {
  types: string;
  location: [number, number] | null;
};

const Input = (types: Props) => {
  const type = types.types;

  const [startValue, setStartValue] = useState<string>(
    `${types.location?.[0]} - ${types.location?.[1]}`
  );
  const [endValue, setEndValue] = useState("");

  console.log(startValue,type);

  const handleInputChange = (event: any) => {
    setEndValue(event.target.value);
  };


  const handleChange = (event: any) => {
    setStartValue(event.target.value);
  };
  return (
    <input
      className=" border-2 border-blue-300 bg-transparent w-full outline-none rounded-md p-1"
      type="text"
      placeholder={
        type === "source" ? "Enter PickOff Point" : "Enter Drop Location"
      }
      value={type === "source" ? startValue : endValue}
      onChange={
        type === "source" ? (e) => handleChange(e) : (e) => handleInputChange(e)
      }
    />
  );
};

export default Input;
