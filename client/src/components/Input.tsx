import { FormEvent, useEffect, useState } from "react";

type Props = {
  types: string;
  positions: [number, number] | null | undefined;
  childFunction: any;
};

const Input = (typess: Props) => {
  const { positions, types, childFunction } = typess;
  const startPoint = `${positions?.[0]} - ${positions?.[1]}`;

  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");

  useEffect(() => {
    setStartValue(startPoint);
  }, [startPoint]);

  const submitEndValue = (event: any) => {
    setEndValue(event.target.value);
    console.log(endValue,childFunction);
    childFunction(endValue);
  };

  const submitStartValue = (event: any) => {
    // setStartValue(event.target.value);
    // console.log(startValue);
    // childFunction(startValue);
  };

  return (
    <input
      className=" border-2 border-blue-300 bg-transparent w-full outline-none rounded-md p-1"
      type="text"
      placeholder={
        types === "source" ? "Enter PickOff Point" : "Enter Drop Location"
      }
      value={types === "source" ? startValue : endValue}
      onChange={
        types === "source"
          ? (e) => submitStartValue(e)
          : (e) => submitEndValue(e)
      }
    />
  );
};

export default Input;
