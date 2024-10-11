import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import jazzcashLogo from "../assets/jazzcash.png";
import easypaisaLogo from "../assets/easypaisa1.png";
import mastercardLogo from "../assets/mastercard.png";
import visacardLogo from "../assets/visa.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../store/slices/Users_Slice"; // Import giveDonation

const Give_Donation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.users);

  // State for form inputs
  const [donatorName, setDonatorName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [dispatch, id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const donationData = {
      donatorName,
      amount,
      message,
    };
    // dispatch(giveDonation(donationData)); // Dispatch donation data
  };

  return (
    <>
      <main className="grow font-rajdhani lg:pt-0">
        <div className="pt-12 pb-20 flex justify-center lg:pb-44 lg:pt-24 xl:pt-[105px]">
          <div className="container p-4">
            <form
              onSubmit={handleSubmit} // Add onSubmit handler
              className="grid grid-cols-12 gap-x-6 md:gap-x-7.5 content-start gap-y-12 lg:gap-y-24 xl:gap-y-28"
            >
              <div className="col-span-full lg:col-start-3 lg:col-span-8">
                <div className="mb-7 lg:mb-16">
                  <div className="flex flex-row justify-center mb-1 not-prose md:mb-2">
                    <div className="flex flex-col items-center">
                      <h2 className="font-bold uppercase leading-none tracking-tighter text-neutral-50 before:inline-block  before:mr-[0.15em] dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5.5xl">
                        Superchat To{" "}
                        <span className="text-redMain">
                          {userDetails?.userName}
                        </span>{" "}
                      </h2>
                    </div>
                  </div>
                  <div className="text-sm font-bold tracking-tighter text-center uppercase text-neutral-50 gap-x-3 dark:text-white md:text-base">
                    <span>
                      Support Your Beloved{" "}
                      <span className="text-redMain">Streamer</span> Now!
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <Label
                      className="block text-sm font-bold uppercase tracking-tight text-neutral-50 dark:text-white [&:not(:empty)]:mb-2.5"
                      htmlFor="donatorName"
                    >
                      Name <span className="text-redMain">*</span>
                    </Label>
                    <Input
                      className="text-lg"
                      type="text"
                      name="donatorName"
                      id="donatorName"
                      value={donatorName}
                      onChange={(e) => setDonatorName(e.target.value)}
                      placeholder=""
                    />
                    <p className="text-sm text-neutral-50">
                      Keep your name as one to appear in the top supporter list
                      (e.g., if you have super chatted with Bilal first, then
                      don&apos;t change this name to Bilal1 or anything else
                      keep the exact name).
                    </p>
                  </div>
                  <div>
                    <Label
                      className="block text-sm font-bold uppercase tracking-tight text-neutral-50 dark:text-white [&:not(:empty)]:mb-2.5"
                      htmlFor="amount"
                    >
                      Amount <span className="text-redMain">*</span>
                    </Label>
                    <Input
                      type="number"
                      name="amount"
                      id="amount"
                      className="text-lg"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <p className="text-sm text-neutral-50">
                      Min: Amount To Show Superchat:{" "}
                      {userDetails?.alertSettings?.minMoneyForAlert} pkr
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  <Label
                    className="block text-sm font-bold tracking-tight uppercase text-neutral-50 dark:text-white"
                    htmlFor="message"
                  >
                    Message
                  </Label>
                  <textarea
                    disabled={
                      amount < userDetails?.alertSettings?.minMoneyForMessage
                    }
                    className="w-full p-2 text-lg bg-transparent border-2 border-gray-600 outline-none focus:border-redMain text-neutral-50"
                    name="message"
                    id="message"
                    value={message} // Bind value
                    onChange={(e) => setMessage(e.target.value)} // Update state on change
                  ></textarea>

                  <p className="text-sm text-neutral-50">
                    Min: Amount To Show Superchat With Message:{" "}
                    {userDetails?.alertSettings?.minMoneyForMessage} pkr
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-10 mt-4">
                  <div className="flex items-center justify-center w-40 p-2 bg-gray-600 border-2 border-transparent rounded cursor-pointer hover:border-redMain">
                    <LazyLoadImage
                      className="w-20"
                      src={jazzcashLogo}
                      effect="blur"
                    />
                  </div>
                  <div className="flex items-center justify-center w-40 p-2 bg-gray-600 border-2 border-transparent rounded cursor-pointer hover:border-redMain">
                    <LazyLoadImage
                      className="w-20"
                      src={easypaisaLogo}
                      effect="blur"
                    />
                  </div>
                  <div className="flex items-center justify-center w-40 p-2 bg-gray-600 border-2 border-transparent rounded cursor-pointer hover:border-redMain">
                    <LazyLoadImage
                      className="w-20"
                      src={mastercardLogo}
                      effect="blur"
                    />
                    <LazyLoadImage
                      className="w-20"
                      src={visacardLogo}
                      effect="blur"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4 rounded-none"
                  variant="secondary"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Give_Donation;
