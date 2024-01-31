import { useForm } from 'react-hook-form';
import {useRegisterNewVehicleMutation} from "../services/api";
import { object, string } from "yup";
import { useNavigate } from 'react-router-dom';

type formValue = {
    vehicleName: string;
    vehicleType: string;
    vehicleNumber: string;
  };

const RegisterVehicle = () => {

    const form = useForm<formValue>();
    const { register, handleSubmit } = form;
    const [registerVehicle] = useRegisterNewVehicleMutation();
    const navigate = useNavigate();

    const schema = object({
        vehicleName: string().required(),
        vehicleType: string().required(),
        vehicleNumber: string().required().min(9),
      });


      const onSubmit = async (data: formValue) => {
        const userData = schema.validate(data);
    
        userData
          .then(async (datas) => {
            console.log(datas);
    
            try {
              const payload = await registerVehicle(datas).unwrap();
              console.log('fulfilled', payload);
              navigate("/setstatus")

            } catch (error) {
              console.error('rejected', error);
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
      <h1 className="text-orange-500 font-bold text-2xl">
        Register a new Vehicle
      </h1>
      <form
        className="w-[40%] h-[30%] border rounded-lg border-cyan-950 flex flex-col gap-7 px-10 py-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" w-full flex justify-between">
          <label
            htmlFor="vehicleName"
            className=" text-orange-500 font-semibold text-lg"
          >
            Vehicle Name:
          </label>
          <input
            className="w-[60%] border-blue-300 border-b-teal-400 "
            placeholder="Enter the vehicleName"
            type="text"
            id="vehicleName"
            {...register("vehicleName")}
          />
        </div>

        <div className=" w-full flex justify-between">
          <label
            className=" text-orange-500 font-semibold text-lg"
            htmlFor="vehicleType"
          >
            Vehicle Type:
          </label>
          <input
            className="w-[60%] border-blue-300 border-b-teal-400 "
            placeholder="Enter the vehicleType"
            type="text"
            id="vehicleType"
            {...register("vehicleType")}
          />
        </div>

        <div className=" w-full flex justify-between">
          <label
            className=" text-orange-500 font-semibold text-lg"
            htmlFor="vehicleNumber"
          >
            Vehicle Number:
          </label>
          <input
            className="w-[60%] border-blue-300 border-b-teal-400 "
            placeholder="Enter the vehicleNumber"
            type="text"
            id="vehicleNumber"
            {...register("vehicleNumber")}
          />
        </div>

        <button
          className="w-20 cursor-pointer h-14 rounded-md text-lg text-green-500 border-red-500 border"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default RegisterVehicle
