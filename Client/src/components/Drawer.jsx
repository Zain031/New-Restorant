import React from "react";
import image4 from "../../public/img-4.png";


export const Drawer = () => {
  return (
    <div className="drawer fixed bottom-4 right-4 z-20 hidden md:block">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn ml-[85rem]  btn-primary drawer-button "
        >
          Special For You 😊
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul
          className="menu bg-base-200 text-base-content min-h-full w-[50rem] mt-14 p-4"
          style={{
            backgroundImage: `url(${image4})`,
            backgroundSize: "99% auto", // Lebar 50% dari ukuran asli, tinggi auto (sesuai rasio)
            backgroundRepeat: "no-repeat", // Untuk menghindari pengulangan gambar
            backgroundPosition: "center", // Posisikan gambar di tengah
          }}
        >
          {/* Sidebar content here */}
        </ul>
      </div>
    </div>
  );
};
