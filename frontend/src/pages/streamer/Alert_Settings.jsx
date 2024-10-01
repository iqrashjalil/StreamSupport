import { Input } from "@/components/ui/input";
import Sidebar from "../../components/Sidebar";

const Alert_Settings = () => {
  return (
    <div className="flex w-full">
      <section className="lg:w-[15%]">
        <Sidebar />
      </section>
      <section className="p-5 lg:w-[85%] flex gap-[1%] w-full font-rajdhani">
        <div className="w-[30%] bg-gray-600 rounded p-5">
          <div className="flex justify-center w-full">
            <h1 className="text-lg font-extrabold text-neutral-50">
              Customize Alert
            </h1>
          </div>
          <div></div>
        </div>
        <div className="w-[69%] flex gap-[2%]">
          <div className="bg-gray-600 w-[48%] rounded p-5">
            <h1 className="text-lg font-extrabold text-neutral-50">
              Overlay Link
            </h1>
            <p className="text-sm text-gray-400">
              Insert this URL into the Browser Source of your OBS/Streamlabs.
            </p>
            <Input
              value="ajsdkjasdaskjdhaskjdhkasdhaskjdhaskjdhaskjdaskjdaskdjs"
              className="border-gray-400"
            ></Input>
          </div>
          <div className="bg-gray-600 w-[48%] rounded p-5">
            <h1 className="text-lg font-extrabold text-neutral-50">
              Superchat Link
            </h1>
            <p className="text-sm text-gray-400">
              Place this link on YouTube/Facebook to allow viewers to send Super
              Chats.
            </p>
            <Input
              value="ajsdkjasdaskjdhaskjdhkasdhaskjdhaskjdhaskjdaskjdaskdjs"
              className="border-gray-400"
            ></Input>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Alert_Settings;
