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
                      href="https://web.facebook.com/igiqrash1"
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
                      href="https://www.linkedin.com/in/iqrashjalil/"
                      title="LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="25"
                        height="25"
                        viewBox="0,0,256,256"
                      >
                        <g
                          fill="#ffffff"
                          fillRule="nonzero"
                          stroke="none"
                          strokeWidth="1"
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          strokeMiterlimit="10"
                          strokeDasharray=""
                          strokeDashoffset="0"
                          fontFamily="none"
                          fontWeight="none"
                          textAnchor="none"
                          style={{ mixBlendMode: "normal" }}
                        >
                          <g transform="scale(8.53333,8.53333)">
                            <path d="M9,25h-5v-15h5zM6.501,8c-1.383,0 -2.501,-1.121 -2.501,-2.501c0,-1.38 1.12,-2.499 2.501,-2.499c1.378,0 2.499,1.121 2.499,2.499c0,1.38 -1.121,2.501 -2.499,2.501zM27,25h-4.807v-7.3c0,-1.741 -0.033,-3.98 -2.499,-3.98c-2.503,0 -2.888,1.896 -2.888,3.854v7.426h-4.806v-15.011h4.614v2.051h0.065c0.642,-1.18 2.211,-2.424 4.551,-2.424c4.87,0 5.77,3.109 5.77,7.151c0,0 0,8.233 0,8.233z"></path>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      className="inline-flex items-center justify-center w-10 h-10 text-white transition-all bg-redMain hover:scale-110 hover:opacity-80"
                      href="https://www.instagram.com/iqrashjalil/"
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
