import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useValue } from "../context/ContextProvider";
import { toast } from "react-toastify";
import { googleRegister } from "../actions/user";

export default function Login() {
  const { dispatch } = useValue();
  const [disabled, setDisabled] = useState(false);
  const handleResponse = (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const {
      // sub: id,
      email,
      given_name: firstName,
      family_name: lastName,
      picture: profileImage,
    } = decodedToken;
    googleRegister(
      { email, firstName, lastName, profileImage, isGoogle: true },
      token,
      dispatch
    );
  };
  const handleGoogleLogin = () => {
    setDisabled(true);
    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error("Try to clear the cookies or try again later");
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false);
        }
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/src/assets/favIcon.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div>
              {/* OR section */}
              <div className="flex items-center justify-between">
                <hr className="w-full border-gray-300" />
                <span className="text-sm font-medium leading-6 text-gray-900 mx-4">
                  OR
                </span>
                <hr className="w-full border-gray-300" />
              </div>

              {/* Google login button */}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  disabled={disabled}
                  className="flex w-3/4 justify-center rounded-md cursor-pointer bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-4"
                  onClick={handleGoogleLogin}
                >
                  <img
                    className="h-6 w-6 mr-2"
                    src="/src/assets/googleIcon.png"
                    alt="Google Logo"
                  />
                  Sign in with Google
                </button>
              </div>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
}
