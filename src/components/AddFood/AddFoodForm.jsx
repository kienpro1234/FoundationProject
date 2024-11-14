import React, { useState } from "react";
import Input from "../UI/Input";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../../apis/categoryIndex";
import LoadingIndicator from "../UI/LoadingIndicator";

export default function AddFoodForm() {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = (selectArray) => {
    console.log(selectArray);
    setSelectedValues(selectArray);
  };

  console.log("selectedArray", selectedValues);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu-navbar"],
    queryFn: fetchCategory,
  });

  let options = [];
  if (data) {
    options = data.map((item) => ({
      value: item.categoryName,
      label: item.categoryName[0].toUpperCase() + item.categoryName.slice(1),
    }));
    console.log("options", options);
  }

  return (
    <div>
      <form className={`rounded-md`}>
        {/* Lấy về 1 list category từ api cho vào thẻ select*/}
        <div className="mb-[12px]">
          {/* Duyệt mảng in ra các option */}
          {/* <option value="" disabled hidden>
              Choose category
            </option> */}
          <label htmlFor="selectCat">Chọn loại thức ăn</label>
          {isLoading && <LoadingIndicator />}
          {data && (
            <Select
              onChange={handleSelectChange}
              id="selectCat"
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              options={options}
            ></Select>
          )}
        </div>

        <div className="mb-[12px] flex gap-1">
          <Input className={"w-full border focus:shadow-none border-black"} placeholder={"Dish Name"} />
          <div className={``}></div>
          <Input className={"w-full border focus:shadow-none border-black"} placeholder={"Cooking Time"} />
          <div className={``}></div>
        </div>
        <div className="mb-[12px] flex gap-1">
          <Input className={"w-full border focus:shadow-none border-black"} placeholder={"Price"} />
          <div className={``}></div>
          <select className="w-full border 2xl:py-2 py-1.5 px-4 text-black" name="catChoice" id="">
            {/* Duyệt mảng in ra các option */}
            <option value="" disabled hidden>
              Choose status
            </option>
            <option value="Ready to serve">Ready to serve</option>
            <option value="Out of stock">Out of stock</option>
          </select>
        </div>
      </form>
    </div>
  );
}
