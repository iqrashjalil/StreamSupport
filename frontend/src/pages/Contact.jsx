import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../store/slices/Contact_Slice";
import { toast } from "react-toastify";
import { resetMessage } from "../store/slices/Contact_Slice";

const Contact = () => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.contact);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(formData));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(resetMessage());
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen font-rajdhani">
      <div className="flex justify-center pt-8 page-heading sm:pt-10 md:pt-16 lg:pt-20 xl:pt-24">
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="uppercase font-extrabold leading-none tracking-tight text-neutral-50 xl:text-1.5xl">
              Let&apos;s talk!
            </div>
            <h1 className="relative text-3xl font-bold uppercase leading-none tracking-tighter text-redMain before:text-redMain dark:text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-6.5xl">
              Contact Us
            </h1>
          </div>
        </div>
      </div>
      <main id="main-content" className="grow lg:pt-0">
        <div className="pt-12 flex justify-center pb-20 lg:pb-44 lg:pt-24 xl:pt-[105px]">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20 md:gap-x-6 lg:gap-x-7.5">
              <div className="col-span-full lg:col-span-4 lg:pr-20 xl:pr-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-8 lg:gap-y-14">
                  <div>
                    <div>
                      <div className="mb-2 text-lg font-bold leading-none tracking-tighter text-neutral-50 dark:text-white md:text-xl xl:text-2xl xl:leading-none">
                        <a
                          className="transition-colors hover:text-redMain"
                          href="mailto:affiliates@magix.com"
                        >
                          iqrashjalil<span className="text-redMain">@</span>
                          gmail.com
                        </a>
                      </div>
                      <h6 className="font-bold leading-none tracking-tight text-gray-600 uppercase">
                        Business Inquiries
                      </h6>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="mb-2 text-lg font-bold leading-none tracking-tighter uppercase text-neutral-50 dark:text-white md:text-xl xl:text-2xl xl:leading-none">
                        Talagang
                        <br />
                        <span className="text-redMain">Chakwal</span>,{" "}
                        <span className="text-[#AAFF00]">PAKISTAN</span>
                        <br />
                        48203
                      </div>
                      <h6 className="font-bold leading-none tracking-tight text-gray-600 uppercase">
                        Address
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="h-8 lg:h-14"></div>
                <ul className="flex flex-wrap gap-3 vv-social-list-color">
                  <li>
                    <a
                      className="inline-flex items-center justify-center w-10 h-10 text-white transition-all bg-blue-600 hover:scale-110 hover:opacity-80"
                      href="https://www.facebook.com/danfisher.dev/"
                      title="Facebook"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 8 19"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      className="inline-flex items-center justify-center w-10 h-10 text-white transition-all bg-blue-400 hover:scale-110 hover:opacity-80"
                      href="https://twitter.com/danfisher_dev"
                      title="Twitter"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 17"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      className="inline-flex items-center justify-center w-10 h-10 text-white transition-all bg-redMain hover:scale-110 hover:opacity-80"
                      href="https://instagram.com/dan.fisher.dev/"
                      title="Instagram"
                    >
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 551.034 551.034"
                        width="24"
                        height="24"
                      >
                        <path
                          className="logo"
                          id="XMLID_17_"
                          d="M386.878,0H164.156C73.64,0,0,73.64,0,164.156v222.722 c0,90.516,73.64,164.156,164.156,164.156h222.722c90.516,0,164.156-73.64,164.156-164.156V164.156 C551.033,73.64,477.393,0,386.878,0z M495.6,386.878c0,60.045-48.677,108.722-108.722,108.722H164.156 c-60.045,0-108.722-48.677-108.722-108.722V164.156c0-60.046,48.677-108.722,108.722-108.722h222.722 c60.045,0,108.722,48.676,108.722,108.722L495.6,386.878L495.6,386.878z"
                        />
                        <path
                          id="XMLID_81_"
                          d="M275.517,133C196.933,133,133,196.933,133,275.516 s63.933,142.517,142.517,142.517S418.034,354.1,418.034,275.516S354.101,133,275.517,133z M275.517,362.6 c-48.095,0-87.083-38.988-87.083-87.083s38.989-87.083,87.083-87.083c48.095,0,87.083,38.988,87.083,87.083 C362.6,323.611,323.611,362.6,275.517,362.6z"
                        />{" "}
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-span-full lg:col-span-8">
                <h2 className="text-neutral-50 dark:text-white leading-none tracking-tighter font-bold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:leading-none xl:text-5.5xl xl:leading-[0.92em] mb-6 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-12">
                  Something in your mind?
                  <br />
                  <span className="text-redMain">Send Us a message!</span>
                </h2>
                <form
                  className="grid grid-cols-12 gap-x-5 md:gap-x-6 lg:gap-x-7.5 gap-y-7.5"
                  onSubmit={handleSubmit}
                >
                  <div className="col-span-full md:col-span-6">
                    <label
                      className="block text-sm font-bold uppercase tracking-tight text-neutral-50 dark:text-white mb-2.5"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="w-full px-4 py-2 font-medium leading-8 tracking-tight transition-all duration-150 border border-gray-600 text-neutral-50 bg-backgroundColor placeholder:font-normal placeholder:text-gray-500/60 focus:border-redMain focus:text-neutral-50 focus:outline-0 focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500/80 dark:focus:border-accent dark:focus:bg-gray-900"
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=""
                    />
                  </div>
                  <div className="col-span-full md:col-span-6">
                    <label
                      className="block text-sm font-bold uppercase tracking-tight text-neutral-50 dark:text-white mb-2.5"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-4 py-2 font-medium leading-8 tracking-tight transition-all duration-150 border border-gray-600 text-neutral-50 bg-backgroundColor placeholder:font-normal placeholder:text-gray-500/60 focus:border-redMain focus:text-neutral-50 focus:outline-0 focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500/80 dark:focus:border-accent dark:focus:bg-gray-900"
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                    />
                  </div>
                  <div className="mt-6 col-span-full">
                    <label
                      className="block text-sm font-bold uppercase tracking-tight text-neutral-50 dark:text-white mb-2.5"
                      htmlFor="comment"
                    >
                      Your Message
                    </label>
                    <textarea
                      className="w-full px-4 py-2 font-medium leading-8 tracking-tight transition-all duration-150 border border-gray-600 text-neutral-50 bg-backgroundColor placeholder:font-normal placeholder:text-gray-500/60 focus:border-redMain focus:text-neutral-50 focus:outline-0 focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500/80 dark:focus:border-accent dark:focus:bg-gray-900"
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=""
                    />
                  </div>
                  <div className="pt-2 col-span-full">
                    <Button
                      className="w-full p-6 rounded-none"
                      variant="secondary"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
