// @ts-nocheck
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../axiosConfig";
import LoadingSpinner from "../ui/LoadingSpinner";

const schema = yup
  .object({
    username: yup
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required("Invalid Submission");

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await axios.post("/signup", data);
      reset();
      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full rounded-lg bg-white p-6 shadow-2xl md:w-1/2 ${
        error ? "border-red-500" : ""
      }`}
    >
      <h2 className="mb-4 text-center text-lg font-medium">Register</h2>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="mb-2 block font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className={`w-full rounded-lg border border-gray-400 p-2 ${
            errors.username?.message ? "border-red-500" : ""
          }`}
          {...register("username")}
        />
        {errors.username?.message && (
          <p className="text-xs italic text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-2 block font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className={`w-full rounded-lg border border-gray-400 p-2 ${
            errors.password?.message ? "border-red-500" : ""
          }`}
          {...register("password")}
        />
        {errors.password?.message && (
          <p className="text-xs italic text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirm-password"
          className="mb-2 block font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          className={`w-full rounded-lg border border-gray-400 p-2 ${
            errors.confirmPassword?.message ? "border-red-500" : ""
          }`}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message && (
          <p className="text-xs italic text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mb-4 text-center">
          <button
            type="submit"
            className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 sm:w-full md:w-1/2"
          >
            Register
          </button>
        </div>
      )}
      {error && (
        <p className="text-center text-xs italic text-red-500">{error}</p>
      )}
      <div className="mb-4 text-center">
        Already Have an Acount?{" "}
        <Link to={`/login`} className="text-blue-800">
          Login
        </Link>
      </div>
    </form>
  );
}
