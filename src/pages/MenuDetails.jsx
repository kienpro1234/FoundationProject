import React from "react";
import MenuCategorySection from "../components/Menu/MenuCategorySection";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorBlock from "../components/UI/ErrorBlock";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { DOMAIN } from "../utils/const";
import { isObject } from "../utils/util";

export default function MenuDetails() {
  let url = DOMAIN;
  const params = useParams();
  if (params.id === "all") {
    url += "category";
  } else {
    url += `category/${params.id}`;
  }

  console.log(url);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu", params.id], // Gắn params.id để key luôn cập nhật khi params thay đổi
    queryFn: async ({ signal }) => {
      try {
        const response = await fetch(url, { signal });
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        const result = await response.json();

        console.log("result", result);
        return result.data; // Trả về mảng data thực sự
      } catch (err) {
        throw err;
      }
    },
  });

  console.log(data);

  let content;

  if (isError) {
    content = (
      <ErrorBlock
        title={"Something went wrong"}
        message={error.message || "Can't fetch food categories"}
      />
    );
  }

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (data) {
    content = (
      <>
        {Array.isArray(data) &&
          data.map((category, index) => (
            <MenuCategorySection key={index} category={category} />
          ))}
        {isObject(data) && <MenuCategorySection category={data} />}
      </>
    );
  }
  return <section className="menuDetails">{content}</section>;
}
