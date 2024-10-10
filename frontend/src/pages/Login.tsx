import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Loader, PlaneTakeoff } from "lucide-react";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { AxiosError } from "axios";

export type SignInForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors} } = useForm<SignInForm>();
  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      showToast({ message: "Logged In Successfully", type: "SUCCESS" });
      navigate("/", { replace: true });
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const message = (error.response.data as { message: string }).message;
        showToast({ message, type: "ERROR" });
      }
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')",
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen">
        <nav className="bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <PlaneTakeoff className="h-12 w-12 text-white" />
                  <span className="text-white text-2xl font-bold ml-2">
                    TravelVerse
                  </span>
                </Link>
              </div>
              <div className="block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Link
                    to="/signup"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center p-4"
        >
          <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600">
                Sign in to your TravelVerse account
              </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message:
                        "Password length should be greater than 6 character",
                    },
                  })}
                />
                   {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  mutation.isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {mutation.isPending && !mutation.error ? (
                  <div className="flex justify-center items-center space-x-2">
                    <Loader className="animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}{" "}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
