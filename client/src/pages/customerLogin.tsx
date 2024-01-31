import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useLoginCustomerMutation } from "../services/api";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/reducer/userReducer";

type formValue = {
  email: string;
  password: string;
};

const CustomerLogin = () => {
  const form = useForm<formValue>();
  const { register, handleSubmit } = form;
const navigate = useNavigate();
  const [customerLogin] = useLoginCustomerMutation();
  const dispatch = useAppDispatch();
  const schema = object({
    email: string().email().required(),
    password: string().required().min(8),
  });

  const onSubmit = async (data: formValue) => {
    const userData = schema.validate(data);

    userData
      .then(async (datas) => {
        console.log(datas);

        try {
          const payload = await customerLogin(datas).unwrap();
          console.log("fulfilled", payload);

          const actionData = {
            name: payload.users.username,
            email: payload.users.email,
            token: payload.token,
            id:payload.users._id,
            type:"customer"
          };
          localStorage.setItem("user", JSON.stringify(actionData));
          dispatch(setUser(actionData));
          navigate("/findCabs")
        } catch (error) {
          console.error("rejected", error);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
      <h1 className="text-orange-500 font-bold text-2xl">Login as Customer</h1>
      <form
        className="w-[40%] h-[40%] border rounded-lg border-cyan-950 flex flex-col gap-7 px-10 py-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" w-full flex justify-between">
          <label
            className=" text-orange-500 font-semibold text-lg"
            htmlFor="email"
          >
            UserEmail:
          </label>
          <input
            className="w-[60%] border-blue-300 border-b-teal-400 "
            placeholder="Enter the username"
            type="email"
            id="email"
            {...register("email")}
          />
        </div>

        <div className=" w-full flex justify-between">
          <label
            className=" text-orange-500 font-semibold text-lg"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="w-[60%] border-blue-300 border-b-teal-400 "
            placeholder="Enter the username"
            type="password"
            id="password"
            {...register("password")}
          />
        </div>

        <button
          className="w-20 cursor-pointer h-14 rounded-md text-lg text-green-500 border-red-500 border"
          type="submit"
        >
          Submit
        </button>
        <Link to="/customerregister">New user Register</Link>
      </form>
    </div>
  );
};

export default CustomerLogin;
