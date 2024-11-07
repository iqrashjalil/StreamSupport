import hero from "../assets/hero.webp";
import jazzcashLogo from "../assets/jazzcash.png";
import easypaisaLogo from "../assets/easypaisa.png";
import mastercardLogo from "../assets/mastercard.png";
import visacardLogo from "../assets/visa.png";
import singlelogo from "../assets/singlelogo.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTopStreamers } from "../store/slices/Users_Slice.jsx";
import { serverUrl } from "../serverUrl";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  const dispatch = useDispatch();
  const { topStreamers, loading } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getTopStreamers());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {" "}
          <section>
            <div className="relative h-[360px] w-full overflow-hidden sm:h-[420px] md:h-[440px] lg:h-[540px] xl:h-[640px]">
              <div className="relative z-10 mx-auto max-w-[1440px] px-5">
                <div className="absolute left-0 w-full px-5 text-center top-32 md:top-36 lg:top-32 lg:left-1/2 lg:w-1/2 lg:px-0 lg:text-left xl:-ml-10">
                  <h1 className="z-999 text-5xl text-neutral-50 font-rajdhani font-bold uppercase tracking-tighter  dark:text-white sm:text-6xl md:text-7xl lg:text-9xl lg:leading-[0.75em] xl:text-[170px]">
                    <span className="text-redMain">Stream</span> Support
                  </h1>
                  <div className="text-lg font-rajdhani font-medium uppercase tracking-tighter text-neutral-50 dark:text-white sm:text-xl lg:pt-4 lg:text-2xl xl:pt-5 xl:pl-3 xl:text-[26px]">
                    Fuel Your Stream With Fan Support!
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="absolute left-5 top-8 aspect-square w-3.5 bg-white"></div>
                  <div className="absolute right-[91px] top-[120px] aspect-square bg-redMain w-1 "></div>
                  <div className="absolute right-[168px] top-[120px] aspect-square bg-redMain w-1 "></div>
                  <div className="absolute right-[91px] top-[197px] aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-[91px] top-8 aspect-square w-1 bg-redMain "></div>
                  <div className="absolute right-[168px] top-8 aspect-square w-1 bg-redMain "></div>
                  <div className="absolute right-[244px] top-8 aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-[321px] top-8 aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-[398px] top-8 aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-[474px] top-8 aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-[551px] top-8 aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-[627px] top-8 aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-[704px] top-8 aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-[91px] top-8 aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-1 top-8 aspect-square w-3.5 bg-redMain"></div>
                  <div className="absolute right-1 top-[120px] aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-1 top-[197px] aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-1 top-[274px] aspect-square w-1 bg-redMain"></div>
                  <div className="absolute right-1 top-[351px] aspect-square w-1 bg-redMain"></div>
                </div>
              </div>
              <div className="vv-hero-decoration-left absolute left-0 top-0 z-[5] h-full w-[calc(50vw-130px)] bg-redMain"></div>
              <div className="absolute left-1/2 bottom-0 z-[5] ml-40 flex w-[50w]">
                <div className="vv-hero-decoration-parallelogram h-14 w-28 bg-redMain"></div>
                <div className="dark:bg-gray-800 vv-hero-decoration-parallelogram h-14 w-28"></div>
                <div className="vv-hero-decoration-parallelogram h-14 w-28 bg-redMain"></div>
                <div className="dark:bg-gray-800 vv-hero-decoration-parallelogram h-14 w-28"></div>
                <div className="vv-hero-decoration-parallelogram h-14 w-28 bg-redMain"></div>
              </div>

              <img
                className="absolute md:hidden brightness-50 lg:brightness-125 lg:left-1/2 left-96 z-[6] -translate-x-[103%] lg:block"
                src={hero}
                alt=""
              />
              <div className="left-0 top-0 block h-full w-full bg-[url('../../../assets/img/str2/samples/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-100">
                <div className="absolute inset-0 z-[1] bg-#1f2937 mix-blend-color"></div>
                <div className="absolute inset-0 z-[2] mix-blend-multiply dark:bg-gray-800"></div>
                <div className="absolute inset-0 z-[3] opacity-40 mix-blend-screen dark:bg-[#283341]"></div>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center mt-10">
            <div>
              <h1 className="pl-2 text-xl font-bold uppercase md:text-4xl text-neutral-50 font-rajdhani">
                Accepting <span className="text-redMain">Payments</span>{" "}
                Securely Through
              </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center mt-4 gap-x-60 gap-y-20">
              <LazyLoadImage
                className="w-40"
                src={jazzcashLogo}
                effect="blur"
              />
              <LazyLoadImage
                className="w-40 rounded-xl"
                src={easypaisaLogo}
                effect="blur"
              />
              <LazyLoadImage
                className="w-40"
                src={mastercardLogo}
                effect="blur"
                placeholderSrc="path/to/placeholder/image"
              />

              <LazyLoadImage
                className="w-40"
                src={visacardLogo}
                effect="blur"
              />
            </div>
          </section>
          <section className="py-14 pl-2 flex justify-center lg:py-[88px]">
            <div className="container flex justify-center lg:block">
              <div className="grid grid-cols-12 gap-x-5 md:gap-x-6 lg:gap-x-7.5 gap-y-12">
                <div className="col-span-full md:col-span-6 relative z-[2] md:pt-6 lg:pt-8 xl:pt-10">
                  <div className="flex flex-row items-end justify-between not-prose mb-9 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-20">
                    <div className="flex flex-col">
                      <div className="text-1xl font-medium font-rajdhani uppercase tracking-tight text-redMain md:text-lg lg:text-xl xl:text-1.5xl">
                        About Us
                      </div>
                      <h2 className="font-bold font-rajdhani uppercase leading-none tracking-tighter text-neutral-50 dark:text-white text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6.5xl xl:leading-[0.85em]">
                        Live Stream Alert
                        <br />
                        With{" "}
                        <span className="text-redMain">Extra Features</span>
                      </h2>
                    </div>
                  </div>
                  <div className="lg:max-w-sm flex gap-5 flex-col xl:max-w-[402px] xl:-mt-4">
                    <p className="text-lg font-bold md:text-xl text-neutral-50 font-rajdhani">
                      <span className="text-lime-400">&#10003;</span> Fees As
                      Low As Just{" "}
                      <span className="text-3xl text-redMain"> 10%</span>
                    </p>
                    <p className="text-lg font-bold md:text-xl text-neutral-50 font-rajdhani">
                      <span className="text-lime-400">&#10003;</span> Premium
                      Customization Options
                    </p>
                    <p className="text-lg font-bold capitalize md:text-xl text-neutral-50 font-rajdhani">
                      <span className="text-lime-400">&#10003;</span> Seamless
                      local and global payment options
                    </p>
                    <p className="text-lg font-bold capitalize md:text-xl text-neutral-50 font-rajdhani">
                      <span className="text-lime-400">&#10003;</span> Quick And
                      Secure Withdraw
                    </p>
                    <p className="text-lg font-bold capitalize md:text-xl text-neutral-50 font-rajdhani">
                      <span className="text-lime-400">&#10003;</span> Advanced
                      and refined features
                    </p>
                  </div>
                </div>
                <div className="flex col-span-full md:col-span-6">
                  <figure className="relative isolate z-[1] flex justify-center items-center">
                    <div className="relative">
                      <svg
                        className="hidden md:block md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-[370px] lg:w-[400px] xl:w-[470px] aspect-[47/50] -z-10"
                        fill="none"
                        viewBox="0 0 470 500"
                      >
                        <defs>
                          <pattern
                            id="dotted-pattern"
                            x="0"
                            y="0"
                            width="26"
                            height="26"
                            patternUnits="userSpaceOnUse"
                          >
                            <rect
                              x="0"
                              y="0"
                              width="3"
                              height="3"
                              className="text-[#70747b]"
                              fill="currentColor"
                            ></rect>
                          </pattern>
                        </defs>
                        <rect
                          width="470"
                          height="500"
                          fill="url(#dotted-pattern)"
                        ></rect>
                      </svg>

                      <LazyLoadImage
                        className="relative z-[1] w-96 block "
                        src={singlelogo}
                        effect="blur"
                      />
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center justify-center mt-10">
            <h1 className="pl-2 text-xl font-bold md:text-4xl text-neutral-50 font-rajdhani">
              StreamSupport&apos;s <span className="text-redMain">Leading</span>{" "}
              Streamers
            </h1>
            <div className="container flex items-center justify-center px-4 mt-4">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
                className="w-full "
              >
                <CarouselContent className="relative -ml-1">
                  {topStreamers &&
                    topStreamers.map((streamer, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-1 basis-1/2 md:basis-1/6 lg:basis-[10%]"
                      >
                        <div>
                          <div className="relative group">
                            <LazyLoadImage
                              src={`${serverUrl}/${streamer.profilePic}`}
                              className="rounded"
                              effect="blur"
                            />
                            <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-60"></div>
                          </div>
                          <h1 className="mt-4 text-lg font-extrabold text-redMain font-rajdhani">
                            {streamer.userName}
                          </h1>
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 text-white bg-black" />
                <CarouselNext className="absolute right-0 text-white bg-black" />
              </Carousel>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
