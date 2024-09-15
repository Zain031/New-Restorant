import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handdleRegister(e) {
    e.preventDefault();
    try {
      const requestBody = { fullName, email, password };
      const { data } = await axios.post(
        "http://localhost:3000/register",
        requestBody
      );
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Succes register",
      });

      console.log(data);
      navigate("/login");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-orange-200 flex justify-center items-center min-h-screen p-4 sm:p-8">
      <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 p-4">
        <h1 className=" font-extrabold text-slate-600 text-center text-3xl mb-5 ">
          Bamboo Grove <span className="text-orange-500">Restaurant</span>{" "}
        </h1>
        <form
          onSubmit={handdleRegister}
          className="pt-10 shadow-2xl p-6 rounded-md bg-white"
        >
          <div className="mb-4">
           
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                id="fullName"
                name="name"
                className="w-full "
                autoComplete="off"
                required
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-3 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full"
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>

              <input
                type="password"
                id="password"
                name="password"
                className="w-full "
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-orange-400 mt-6 hover:bg-orange-600 text-black font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
          </button>
        </form>
        <Link to={"/login"}>
          <p className="text-center text-sm mt-5 hover:underline hover:text-blue-600">
            Back
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Register;
