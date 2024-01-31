import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState, useAppSelector } from "../store/store";

const userData = localStorage.getItem("user");
let parse = userData ? JSON.parse(userData) : "";
const id = parse.id;
console.log(id);
console.log(userData);


export const api: any = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4001/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      console.log(token);
      if (token) {
        console.log(token);
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerNewDriver: builder.mutation<User, RegisterUsers>({
      query: (body) => ({
        url: `/driver/register`,
        method: "POST",
        body,
      }),
    }),
    registerNewCustomer: builder.mutation<User, RegisterUsers>({
      query: (body) => ({
        url: `/customer/register`,
        method: "POST",
        body,
      }),
    }),
    loginDriver: builder.mutation<User, LoginUsers>({
      query: (body) => ({
        url: `/driver/login`,
        method: "POST",
        body,
      }),
    }),
    loginCustomer: builder.mutation<User, LoginUsers>({
      query: (body) => ({
        url: `/customer/login`,
        method: "POST",
        body,
      }),
    }),

    registerNewVehicle: builder.mutation<Vehicle, any>({
      query: (body) => ({
        url: `/driver/register_vehcile/${id}`,
        method: "PUT",
        body,
      }),
    }),

    setVehicleStatus: builder.mutation<Vehicle, any>({
      query: (body) => ({
        url: `/driver/register_vehcile/setstatus/${id}`,
        method: "PUT",
        body,
      }),
    }),

  }),
});

export const {
  useRegisterNewDriverMutation,
  useRegisterNewCustomerMutation,
  useLoginDriverMutation,
  useLoginCustomerMutation,
  useRegisterNewVehicleMutation,
  useSetVehicleStatusMutation
} = api;
