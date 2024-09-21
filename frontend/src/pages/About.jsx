import { LazyLoadImage } from "react-lazy-load-image-component";
import chatimage from "../assets/chatimage.webp";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BiSolidCustomize, BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineSettingsSuggest } from "react-icons/md";
const About = () => {
  return (
    <div className="flex items-center justify-center p-2 lg:h-screen font-rajdhani">
      <section className="flex flex-col justify-center gap-5 lg:flex-row">
        <div className="bg-gray-600 lg:relative rounded-xl lg:w-[30%] p-2">
          <h1 className="text-2xl font-extrabold text-redMain">Our Dream</h1>
          <h1 className="text-5xl font-extrabold lg:mt-5 text-neutral-50">
            Revolutionize viewer interactions in{" "}
            <span className="text-[#AAFF00]">Pakistan</span>
          </h1>
          <p className="mt-4 text-lg lg:absolute bottom-10 text-neutral-50">
            Unfortunately, YouTube Super Chat isn&apos;t currently available in
            Pakistan. This limitation restricts the ability of Pakistani viewers
            to directly support their favorite creators and interact with them
            in a more meaningful way. To address this gap, I&apos;ve developed a
            system that allows users to send super chats to streamers directly
            through our platform. This system provides a convenient alternative,
            enabling Pakistani viewers to contribute to their favorite content
            creators and enhance the overall streaming experience.
          </p>
        </div>
        <div className="lg:w-[30%]">
          <div className="w-full">
            <LazyLoadImage
              className="w-full rounded-xl" // Removed lg:w-full here
              src={chatimage}
              effect="blur"
            />
          </div>
          <div className="flex flex-wrap justify-center p-2 mt-4 bg-gray-600 gap-y-5 lg:gap-y-10 lg:gap-x-10 gap-x-2 text-neutral-50 rounded-xl">
            <div className="w-52 flex-col bg-[#353c46] flex justify-center items-center p-5 rounded-xl">
              <h1>Low Fees</h1>
              <RiMoneyDollarCircleFill className="text-4xl text-[#AAFF00]" />
            </div>
            <div className="w-52 flex-col bg-[#353c46] flex justify-center items-center p-5 rounded-xl">
              Customize Functionality
              <MdOutlineSettingsSuggest className="text-4xl text-purple-500 " />
            </div>
            <div className="w-52 flex-col bg-[#353c46] flex justify-center items-center p-5 rounded-xl">
              Advance Features
              <BiSolidCustomize className="text-4xl text-orange-500" />
            </div>
            <div className="w-52 flex-col bg-[#353c46] flex justify-center items-center p-5 rounded-xl">
              Quick Withdraw
              <BiMoneyWithdraw className="text-4xl text-blue-500" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
