import React from "react";
import MenuLanding from "../components/Menu/MenuLanding";
import { useParams } from "react-router-dom";
import Food from "../components/Food/Food";
import { DOMAIN } from "../utils/const";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../components/UI/ErrorBlock";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import CustomerReview from "../components/Food/CustomerReview";

export default function FoodDetail() {
  const params = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["food", params.id],
    queryFn: async ({ signal }) => {
      try {
        const res = await fetch(`${DOMAIN}dishes/${params.id}`, { signal });

        if (!res.ok) {
          throw new Error("Can't fetch food");
        }

        const result = await res.json();

        return result.data;
      } catch (err) {
        throw err;
      }
    },
  });

  let content;

  if (isError) {
    content = (
      <ErrorBlock title={"Something went wrong"} message={error.message} />
    );
  }

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (data) {
    content = (
      <>
        <MenuLanding />
        <main>

            <Food food={data} />

        </main>
      </>
    );
  }

  return (
    <div className="foodDetail">
      {content}
      <CustomerReview />
    </div>
  );
}
