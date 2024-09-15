import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Aos from "aos";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { increment } from "../redux/counterSlice";

import { Link } from "react-router-dom";
import { Drawer } from "./Drawer";
import { Hero } from "./Hero";
import Info from "./Info";

function Home() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [errorSearch, setErrorSearch] = useState("");

  const dispatch = useDispatch();

  async function getData() {
    try {
      const { data } = await axios.get("http://localhost:3000/products", {});

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handdleAddCart(id) {
    try {
      const token = localStorage.getItem("access_token");

      if (token) {
        const { data } = await axios({
          method: "post",
          url: "http://localhost:3000/carts/" + id,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Success add in your cart",
        });

        dispatch(increment());
      } else {
        document.getElementById("login_modal").showModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategory() {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/categories",
      });

      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategoryProduct(id) {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/productByCategoryId/" + id,
      });

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handdleSearch(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:3000/search?search=${search}`,
      });

      if (data.data.length != 0) {
        console.log(data.data.length);
        setProduct(data.data);
      } else {
        getData();
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "warning",
          title: "Product Not Found",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  setTimeout(() => {
    setErrorSearch("");
  }, 5000);

  useEffect(() => {
    getData();
    getCategory();
    Aos.init();
  }, []);

  return (
    <>
      {product.length ? (
        <div>
          <Drawer />
          <Hero />
          <Info />

          <div className="sticky md:top-20 top-12 z-10 bg-orange-400 shadow-md py-3 mt-10">
            <div
              id="order"
              className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 text-xl md:text-2xl justify-center items-center px-4"
            >
              <div className="p-1 rounded-md hover:bg-white active:bg-white hover:shadow-md focus:shadow-md focus:bg-white font-light px-4">
                <button onClick={getData} className="w-full text-center">
                  All Product
                </button>
              </div>
              {category.map((item) => (
                <div
                  key={item.id}
                  className="p-1 rounded-md hover:bg-white active:bg-white hover:shadow-md focus:shadow-md focus:bg-white font-light px-4"
                >
                  <button
                    className="w-full text-center"
                    onClick={() => getCategoryProduct(item.id)}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4 px-4">
              <form
                onSubmit={handdleSearch}
                className="flex gap-3 w-full max-w-xl"
              >
                <input
                  className="w-full h-10 px-4 border outline-none rounded-md border-slate-500"
                  type="search"
                  name="search"
                  placeholder="search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </form>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 m-4 md:grid-cols-4 md:gap-6 lg:gap-8 ">
            {product.map((item) => (
              <div
                data-aos="zoom-in-up"
                data-aos-duration="300"
                key={item.id}
                className="bg-white font-semibold text-center rounded-md border shadow-md p-4 md:p-6 lg:p-8 max-w-xs mx-auto  mb-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h1 className="text-sm bg-yellow-400 text-gray-700 inline-block p-1 rounded-md">
                  {item.Category.name}
                </h1>
                <img
                  className="mb-3 w-32 h-32 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full mx-auto hover:scale-105 transition-transform duration-150"
                  src={item.imgUrl}
                  alt={item.title}
                />
                <h1 className="text-lg text-gray-700">{item.title}</h1>
                <h3 className="text-xl text-gray-500">
                  Rp.{new Intl.NumberFormat("id-IN").format(item.price)}
                </h3>

                <button
                  onClick={() => handdleAddCart(item.id)}
                  className="bg-orange-500 hover:bg-orange-600 py-2 mt-4 rounded-sm w-full text-gray-100 font-semibold uppercase tracking-wide transition-colors duration-200"
                >
                  Add Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="ml-[42rem]">
          <iframe
            className=" h-[36rem] "
            src="https://lottie.host/embed/3c2d6dc9-0110-4872-8994-fee53acb60da/qfCZCzIQ4R.json"
          ></iframe>
        </div>
      )}

      <dialog id="login_modal" className="modal text-slate-900">
        <div className="modal-box bg-white rounded-md">
          <h3 className="font-light text-lg">
            To add to cart must login first
          </h3>
          <div className="modal-action">
            <form method="dialog">
              <Link to={"/login"}>
                <button className="btn bg-green-500 hover:bg-green-700 text-white">
                  Login
                </button>
              </Link>
            </form>
            <form method="dialog">
              <button className="btn bg-red-500 hover:bg-red-700 text-white">
                Cancle
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Home;
