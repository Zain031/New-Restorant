import axios from "axios";
import React, { useEffect, useState } from "react";
import Aos from "aos";

function Orders() {
  const [order, setOrder] = useState([]);
  const [date, setDate] = useState("");

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

      data.map((item) => {
        const newDate = item.createdAt;
        const date = new Date(newDate);
        const formattedDate = date.toLocaleString();
        setDate(formattedDate);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrder();
    Aos.init();
  }, []);

  return (
    <>
      <div className="p-4 md:p-8 lg:p-28 md:mt-0 mt-44">
        <div
          className="px-4 md:px-6 lg:px-10 shadow-xl mx-2 md:mx-4 lg:mx-10 pt-6 md:pt-8 lg:pt-10 rounded-xl"
          data-aos="zoom-in"
        >
          <div className="overflow-x-auto">
            <table className="w-full table-auto mb-10">
              <thead className="text-xs font-semibold uppercase text-gray-600 border-b-2 border-gray-800">
                <tr>
                  <th className="p-2">
                    <div className="text-left font-semibold">No</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Payment Date</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Order ID</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Total Price</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Status</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm border-t-2 border-gray-400">
                {order.map((item, index) => (
                  <tr key={item.id}>
                    <td className="p-2">
                      <div className="font-medium text-gray-800 ml-2">
                        {++index}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="font-medium text-gray-800">
                        {item.status === "success" ? date : "-"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="font-medium text-gray-800">
                        {item.orderId}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="font-medium text-gray-800">
                        Rp. {new Intl.NumberFormat("id-IN").format(item.amount)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div
                        className={`${
                          item.status === "success"
                            ? "bg-green-400"
                            : "bg-red-400"
                        } font-semibold uppercase tracking-wide py-1 px-2 rounded-md inline-block`}
                      >
                        {item.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr className="my-4" />
        </div>
        <div className="pb-36"></div>
      </div>
    </>
  );
}

export default Orders;
