import axios from "axios";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import Swal from "sweetalert2";

function Carts() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState([]);

  async function getCart() {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get("http://localhost:3000/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let price = 0;
      data.forEach((item) => {
        price += item.Product.price * item.amount;
      });
      console.log(data);
      setCart(data);
      setTotalPrice(price);
    } catch (error) {
      console.log(error);
    }
  }

  async function changeAmount(id, amount) {
    try {
      const token = localStorage.getItem("access_token");
      const requestBody = { amount };
      const { data } = await axios({
        method: "patch",
        url: "http://localhost:3000/carts/" + id,
        data: requestBody,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      getCart();
    } catch (error) {
      console.log(error);
    }
  }

  async function handdleDelete(id) {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.delete("http://localhost:3000/carts/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      getCart();
    } catch (error) {
      console.log(error);
    }
  }

  function handdleDeleteAll() {
    try {
      const data = cart;
      data.forEach((item) => {
        handdleDelete(item.Product.id);
      });
    } catch (error) {}
  }

  async function handdleCheckOut() {
    //data ini berisi orderId,transacrtion dan message .mendapatkan Transaction token

    const token = localStorage.getItem("access_token");
    const reqBody = { totalPrice };

    if (totalPrice == 0) {
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
        title: "No product can be check out",
      });
    } else {
      const { data } = await axios.post(
        "http://localhost:3000/payment-midtrans",
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(totalPrice);

      // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
      window.snap.pay(data.transactionToken, {
        onSuccess: async function (result) {
          /* You may add your own implementation here */
          Swal.fire({
            icon: "success",
            title: `Payment Succes`,
          });

          console.log(result);

          const token = localStorage.getItem("access_token");
          await axios.patch(
            "http://localhost:3000/update-payment",
            {
              orderId: data.orderId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          handdleDeleteAll();
        },
      });
    }
  }

  async function getOrder() {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get("http://localhost:3000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handdleDeletePopUp() {
    if (totalPrice == 0) {
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
        title: "No product can be deleted",
      });
    } else {
      document.getElementById("delete_modal").showModal();
    }
  }

  useEffect(() => {
    getCart();
    getOrder();
    Aos.init();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row pt-8 md:pt-36 px-4 md:px-10 md:mt-0 mt-52 justify-between">
        <div
          role="alert"
          className="alert alert-warning max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-4 py-3 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="ml-3 text-sm">
            To pay, click this link and copy your virtual account{" "}
            <a href="https://simulator.sandbox.midtrans.com" target="_blank">
              <b>
                <u>Midtrans simulator</u>
              </b>
            </a>{" "}
          </span>
        </div>

        <button className="ml-0 md:ml-10 mt-4 md:mt-0 flex justify-end">
          <div
            onClick={handdleDeletePopUp}
            className="bg-red-500 hover:bg-red-600 hover:text-white w-full md:w-44 px-2 py-1 flex rounded-sm gap-2"
          >
            <ion-icon name="trash-outline" />
            <div className="font-semibold tracking-wide">
              Clear All Products
            </div>
          </div>
        </button>
      </div>

      {/* Delete Modal */}
      <dialog id="delete_modal" className="modal text-slate-900">
        <div className="modal-box bg-white rounded-md">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete all?
          </h3>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={handdleDeleteAll}
                className="btn bg-red-500  hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </form>
            <form method="dialog">
              <button className="btn bg-green-500 hover:bg-green-700 text-white">
                Back
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Cart Table */}
      <div
        className="px-4 md:px-10  mx-4 md:mx-10 pt-8 md:pt-10 rounded-xl "
        data-aos="zoom-in"
      >
        <table className="w-full table-auto border-b-2 border-gray-800">
          <thead className="text-xs font-semibold uppercase text-gray-600">
            <tr>
              <th className="p-2 text-left font-semibold">No</th>
              <th className="p-2 text-left font-semibold"></th>
              <th className="p-2 text-left font-semibold">Product Name</th>
              <th className="p-2 text-left font-semibold">Price</th>
              <th className="p-2 text-left font-semibold">Quantity</th>
              <th className="p-2 text-center font-semibold">Total</th>
              <th className="p-2 text-center font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm border-t-2 border-gray-400">
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800 ml-2">
                  {index + 1}
                </td>
                <td className="p-2 font-medium text-gray-800">
                  <img
                    className="w-24 md:w-36"
                    src={item.Product.imgUrl}
                    alt={item.Product.title}
                  />
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.Product.title}
                </td>
                <td className="p-2 text-left">
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID").format(item.Product.price)}
                </td>
                <td className="p-2 flex gap-2 md:gap-4 items-center mt-0 md:mt-10">
                  <button
                    className="bg-orange-300 w-8 md:w-10 h-6 md:h-8 font-bold rounded-sm"
                    onClick={() =>
                      changeAmount(item.Product.id, item.amount - 1)
                    }
                  >
                    -
                  </button>
                  <div className="text-left text-lg font-bold text-green-500">
                    {item.amount}
                  </div>
                  <button
                    className="bg-orange-300 w-8 md:w-10 rounded-sm font-bold h-6 md:h-8"
                    onClick={() =>
                      changeAmount(item.Product.id, item.amount + 1)
                    }
                  >
                    +
                  </button>
                </td>
                <td className="font-bold w-24 md:w-28 px-2 py-1 rounded-sm text-center text-gray-700">
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    item.Product.price * item.amount
                  )}
                </td>
                <td className="p-2">
                  <div
                    className="flex justify-center"
                    onClick={() => handdleDelete(item.Product.id)}
                  >
                    <button>
                      <ion-icon size="large" name="trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start pb-20 pt-10 text-md">
          <div className="font-bold">Total Price</div>
          <div className="font-bold px-3 py-1 rounded-sm bg-yellow-300">
            Rp. {new Intl.NumberFormat("id-ID").format(totalPrice)}
          </div>

          <button
            onClick={handdleCheckOut}
            className="bg-green-400 px-2 py-1 rounded-sm md:mt-0 mt-2 hover:bg-green-500 hover:text-white font-semibold uppercase tracking-wide"
          >
            Check Out
          </button>
        </div>
      </div>
      <div className="pb-36"></div>
    </>
  );
}

export default Carts;
