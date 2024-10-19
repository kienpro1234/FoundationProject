import React from "react";
import MenuLanding from "../components/Menu/MenuLanding";
import Footer from "../components/Footer/Footer";

export default function About() {
  return (
    <div className="about">
      <MenuLanding
        aboutTitle={"Tasty kitchen representing the quintessence of cuisine".toUpperCase()}
      />
      {/* about section */}
      <div className="container-big-screen py-5 px-4">
        {/* content flex */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="basis-1/2">
            <h2 className="font-medium text-2xl">
              TASTY KITCHEN
              <br />
              GET HIGH-END
              <br />
              CUISINE TO YOUR HOME
            </h2>
            <p className="my-3 text-zinc-500 text-sm">
              Being a new F&B business model – online restaurant, TASTY Kitchen
              is a pioneer in delivering premium meal solutions to your family's
              dining table.
            </p>
            <p className="mb-4 text-zinc-500 text-sm">
              With a kitchen system that is constantly being invested and
              expanded; natural, fresh ingredients carefully selected from the
              leading prestigious farms in Vietnam; and the creative, dedicated
              hands of experienced chefs, we are proud of serving our valued
              customers the best-quality and healthy dishes.
            </p>

            <button className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white">
              ORDER NOW!
            </button>
          </div>
          <div className="basis-1/2">
            <img
              className="object-cover"
              src="https://static.tastykitchen.vn/images/imgabout_1_v2.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Values section */}
      <div className="container-big-screen py-5 px-4 text-white bg-about-values-img bg-center bg-cover">
        {/* Top content */}
        <div className="text-center mb-3">
          <h3 className="text-sm font-md">TASTY CHICKEN</h3>
          <h2 className="text-4xl tracking-wider mb-3">CORE VALUES</h2>
          <p className="text-sm w-full md:w-3/5 mx-auto">
            TASTY Kitchen pioneers the concept of "Restaurant at Home" in
            Vietnam with superior quality, bringing a unique new culinary style
            to diners.
          </p>
        </div>
        {/* Middle content */}
        <div className="flex flex-col md:flex-row md:h-[150px] gap-4 md:justify-between 2xl:justify-center 2xl:gap-[20px]  mt-[35px] mb-[45px] ">
          <div className="py-[15px] md:py-[76px] md:px-[45px] border border-white rounded-3xl text-white  text-center flex items-center justify-center ">
            {/* item content */}
            <div className="flex flex-col gap-[16px] items-center">
              <img
                className={"w-[50px]"}
                src="https://static.tastykitchen.vn/images/icon_conscientious_heart.png"
                alt=""
              />
              <p className="text-xl tracking-wide">TẬN TÂM</p>
            </div>
          </div>
          <div className="py-[15px] md:py-[76px] md:px-[45px] border border-white rounded-3xl text-white  text-center flex items-center justify-center ">
            {/* item content */}
            <div className="flex flex-col gap-[16px] items-center">
              <img
                className={"w-[50px]"}
                src="https://static.tastykitchen.vn/images/icon_acknowledge.png"
                alt=""
              />
              <p className="text-xl tracking-wide">TẬN TÂM</p>
            </div>
          </div>
          <div className="py-[15px] md:py-[76px] md:px-[45px] border border-white rounded-3xl text-white  text-center flex items-center justify-center ">
            {/* item content */}
            <div className="flex flex-col gap-[16px] items-center">
              <img
                className={"w-[50px]"}
                src="https://static.tastykitchen.vn/images/icon-loves.png"
                alt=""
              />
              <p className="text-xl tracking-wide">TẬN TÂM</p>
            </div>
          </div>
          <div className="py-[15px] md:py-[76px] md:px-[45px] border border-white rounded-3xl text-white  text-center flex items-center justify-center ">
            {/* item content */}
            <div className="flex flex-col gap-[16px] items-center">
              <img
                className={"w-[50px]"}
                src="https://static.tastykitchen.vn/images/icon-delicate.png"
                alt=""
              />
              <p className="text-xl tracking-wide">TẬN TÂM</p>
            </div>
          </div>
          <div className="py-[15px] md:py-[76px] md:px-[45px] border border-white rounded-3xl text-white  text-center flex items-center justify-center ">
            {/* item content */}
            <div className="flex flex-col gap-[16px] items-center">
              <img
                className={"w-[50px]"}
                src="https://static.tastykitchen.vn/images/icon-loves.png"
                alt=""
              />
              <p className="text-xl tracking-wide">TẬN TÂM</p>
            </div>
          </div>
        </div>
        {/* Bottom content */}
        <div className="w-full md:w-[55%] mx-auto mt-[10px]">
          <p className="text-center text-sm mb-3">
            TASTY Kitchen, with a huge passion for cuisine, wants to bring you
            more choices, at higher standards:
          </p>
          <div className="about-bottom-flex flex flex-wrap flex-col justify-between md:flex-row gap-x-[50px] gap-y-7 text-sm md:text-base w-4/5 md:w-full mx-auto ">
            <div className="flex  gap-4 items-center justify-center">
              <img
                src="https://static.tastykitchen.vn/images/checked.svg"
                alt=""
              />
              <span>Tasty, nutritious and safe meals</span>
            </div>
            <div className="flex  gap-4 items-center justify-center">
              <img
                src="https://static.tastykitchen.vn/images/checked.svg"
                alt=""
              />
              <span>Tasty, nutritious and safe meals</span>
            </div>
            <div className="flex  gap-4 items-center justify-center">
              <img
                src="https://static.tastykitchen.vn/images/checked.svg"
                alt=""
              />
              <span>Tasty, nutritious and safe meals</span>
            </div>
            <div className="flex gap-4  items-center justify-center">
              <img
                src="https://static.tastykitchen.vn/images/checked.svg"
                alt=""
              />
              <span>Tasty, nutritious and safe meals</span>
            </div>
          </div>
        </div>
      </div>
      {/* services section */}
      <div className="container-big-screen services py-5 md:px-4">
        {/* services top content */}
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-32 mb-14">
          {/* item */}
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[250px] md:w-[200px] h-[250px] md:h-[200px] bg-zinc-200 relative rounded-full">
              <img
                className="absolute top-1/2 left-[55%] translate-x-[-50%] translate-y-[-50%]"
                src="https://static.tastykitchen.vn/images/icon-oder.png"
                alt=""
              />
            </div>

            <p className="font-semibold mt-2 md:mt-0 text-5xl md:text-4xl">
              PLACE ORDER
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[250px] md:w-[200px] h-[250px] md:h-[200px] bg-zinc-200 relative rounded-full">
              <img
                className="absolute top-1/2 left-[50%] translate-x-[-50%] translate-y-[-50%]"
                src="https://static.tastykitchen.vn/images/icon-try-stretching.png"
                alt=""
              />
            </div>

            <p className="font-semibold mt-2 md:mt-0 text-5xl md:text-4xl">
              RELAX
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[250px] md:w-[200px] h-[250px] md:h-[200px] bg-zinc-200 relative rounded-full">
              <img
                className="absolute top-1/2 left-[50%] translate-x-[-50%] translate-y-[-50%]"
                src="https://static.tastykitchen.vn/images/icon-enjoy.png"
                alt=""
              />
            </div>

            <p className="font-semibold mt-2 md:mt-0 text-5xl md:text-4xl">
              ENJOY
            </p>
          </div>
        </div>
        {/* services bottom content */}
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-12 mb-5 w-11/12 mx-auto">
          {/* item */}
          <div className="flex flex-col md:flex-row gap-x-3 md:w-1/2">
            <div className="w-full">
              <img
              className="w-full"
                src="https://static.tastykitchen.vn/images/img16.jpg"
                alt=""
              />
            </div>
            <p className="text-xl">
              Pure taste from natural and fresh ingredients rigorously selected
              from leading prestigious farms in Vietnam
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-x-3 md:w-1/2">
            <div className="w-full">
              <img
              className="w-full"
                src="https://static.tastykitchen.vn/images/img16.jpg"
                alt=""
              />
            </div>
            <p className="text-xl">
              Pure taste from natural and fresh ingredients rigorously selected
              from leading prestigious farms in Vietnam
            </p>
          </div>
        </div>
        {/* content 2 */}
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-12 w-11/12 mx-auto">
          {/* item */}
          <div className="flex flex-col md:flex-row gap-x-3 md:w-1/2">
            <div className="w-full">
              <img
              className="w-full"
                src="https://static.tastykitchen.vn/images/img16.jpg"
                alt=""
              />
            </div>
            <p className="text-xl">
              Pure taste from natural and fresh ingredients rigorously selected
              from leading prestigious farms in Vietnam
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-x-3 md:w-1/2">
            <div className="w-full">
              <img
              className="w-full"
                src="https://static.tastykitchen.vn/images/img16.jpg"
                alt=""
              />
            </div>
            <p className="text-xl">
              Pure taste from natural and fresh ingredients rigorously selected
              from leading prestigious farms in Vietnam
            </p>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}
