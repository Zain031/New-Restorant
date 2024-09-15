import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handdleLogin(e) {
    e.preventDefault();
    try {
      const requestBody = { email, password };
      const response = await axios.post(
        "http://localhost:3000/login",
        requestBody
      );
      console.log(response);
      localStorage.setItem("access_token", response.data.access_token);
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
        title: "Succes Login",
      });

      navigate("/");
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: `${error.response.data.message}`,
      });
    }
  }

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/google-login",
        headers: {
          google_token: response.credential,
        },
      });

      console.log(data);

      localStorage.setItem("access_token", data.access_token);
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
        title: "Succes Login",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function googleLogin() {
    window.google.accounts.id.initialize({
      client_id:
        "154285753869-3iqhohcfbfk2blac1vb934r210hihr86.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } 
    );
    window.google.accounts.id.prompt(); 
  }

  useEffect(() => {
    googleLogin();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen 0">
      <div className="w-full sm:w-[28rem] px-4 sm:px-0 ">
        <h1 className=" font-extrabold text-slate-600 text-center text-3xl ">
          Bamboo Grove <span className="text-orange-500">Restaurant</span>{" "}
        </h1>
        <form
          onSubmit={handdleLogin}
          className="shadow-2xl p-6 sm:p-10 rounded-lg mt-8"
        >
          <div className="font-bold text-2xl text-gray-700 mb-6 text-center">
            Login
          </div>

          <label className="input input-bordered flex items-center gap-2">
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
              className="w-full "
              autoComplete="off"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full "
              autoComplete="off"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </label>

          <button
            type="submit"
            className="bg-orange-400 mt-6 hover:bg-orange-600 text-black font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
        <div className="w-full text-center mt-3 md:ml-28 ml-16">
          <div id="buttonDiv"></div>
        </div>
        <div className="mt-4 text-black text-center font-light text-sm">
          <a>
            Don't have an account yet?{" "}
            <Link to={"/register"}>
              <span className="text-blue-700 hover:underline font-bold hover:cursor-pointer">
                Register
              </span>
            </Link>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
