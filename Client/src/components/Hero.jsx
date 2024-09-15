import React from "react";
import image from "../../public/img.png";

export const Hero = () => {
  return (
    <div
      className="hero min-h-screen "
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-neutral-content text-center">
        <div>
          <div className="pt-40 pb-5">
            <h1 className="text-center text-6xl font-extrabold text-white ">
              Bamboo Grove <span className="text-orange-500">Restaurant</span>{" "}
            </h1>
          </div>
          <p className="hidden md:block mx-20 font-bold">
            restaurant that specializes in serving various types of burgers as
            the main menu, as well as a variety of coffee choices as the
            mainstay drink. In addition, this restaurant also provides other
            side dishes such as French fries, salads, sandwiches, desserts, and
            various non-coffee drinks. This restaurant is designed to meet the
            needs of customers who want delicious fast food with a relaxed and
            comfortable atmosphere, perfect for lunch, dinner, or just relaxing
            with coffee.
          </p>

          <div className="text-center mt-10">
            <button className=" text-white bg-orange-500 py-2 px-6 text-2xl rounded-md hover:bg-orange-600 hover:text-white hover:shadow-2xl font-semibold uppercase tracking-wide transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200">
              <a href="#order">Order Now</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
