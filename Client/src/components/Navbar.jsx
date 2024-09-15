import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, showCount } from "../redux/counterSlice";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.countCart.value);

  async function handdleLogout() {
    localStorage.removeItem("access_token");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Succes Logout",
    });
    navigate("/login");
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function handdlePopUp() {
    document.getElementById("logout_modal").showModal();
  }

  useEffect(() => {}, []);

  return (
    <div className="fixed top-0 left-0 right-0 w-screen h-12 md:h-20 bg-white shadow-none md:shadow-lg z-50 flex justify-between items-center px-4 md:px-10">
      
      <div className="hidden md:block">
        <div className="bg-orange-400 p-2 rounded-full shadow-2xl hover:bg-orange-500">
          <img className="w-12 rounded-full shadow-2xl" src={logo} alt="Logo" />
        </div>
      </div>

      
      <div className="block md:hidden">
        <button className="text-3xl" onClick={toggleMenu}>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
      </div>

      
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:space-x-20 bg-white md:bg-transparent  mt-0 absolute md:static top-12 left-0 w-full md:w-auto md:justify-end md:items-center px-4 md:px-0 transition-all`}
      >
        <Link
          className={`flex gap-2 px-2 py-1 rounded-sm hover:text-white hover:bg-orange-400 ${
            location.pathname === "/" ? "bg-orange-400" : ""
          }`}
          to={"/"}
        >
          <ion-icon size="large" name="restaurant-outline"></ion-icon>
          <span className="font-light uppercase tracking-wide">Menus</span>
        </Link>

        <Link
          onClick={() => dispatch(resetCart())}
          className={`flex gap-2 px-2 py-1 rounded-sm hover:text-white hover:bg-orange-400 ${
            location.pathname === "/cart" ? "bg-orange-400" : ""
          }`}
          to={"/cart"}
        >
          <ion-icon size="large" name="cart-outline"></ion-icon>
          <span className="font-light uppercase tracking-wide">Cart</span>
          {count > 0 && (
            <span className="text-red-500 font-bold text-sm">New {count}</span>
          )}
        </Link>

        <Link
          className={`flex gap-2 px-2 py-1 rounded-sm hover:text-white hover:bg-orange-400 ${
            location.pathname === "/order" ? "bg-orange-400" : ""
          }`}
          to={"/order"}
        >
          <ion-icon size="large" name="checkbox-outline"></ion-icon>
          <span className="font-light uppercase tracking-wide">Orders</span>
        </Link>

        <Link
          onClick={handdlePopUp}
          className="flex gap-2 px-2 py-1 rounded-md hover:shadow-xl hover:bg-orange-500 hover:text-white"
        >
          <ion-icon name="log-out-outline" size="large"></ion-icon>
          <span className="font-light uppercase tracking-wide">Logout</span>
        </Link>
      </div>

      <dialog id="logout_modal" className="modal text-slate-900">
        <div className="modal-box bg-white rounded-md">
          <h3 className="font-bold text-lg">
            Are you sure you want to logout?
          </h3>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={handdleLogout}
                className="btn bg-red-500 hover:bg-red-700 text-white"
              >
                Logout
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
    </div>
  );
}

export default Navbar;
