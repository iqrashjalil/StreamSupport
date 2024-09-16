import React from "react";
import hero from "../assets/hero.webp";
const Home = () => {
  return (
    <>
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
            <div className="bg-black vv-hero-decoration-parallelogram h-14 w-28"></div>
            <div className="vv-hero-decoration-parallelogram h-14 w-28 bg-redMain"></div>
            <div className="bg-black vv-hero-decoration-parallelogram h-14 w-28"></div>
            <div className="vv-hero-decoration-parallelogram h-14 w-28 bg-redMain"></div>
          </div>
          <img
            className="absolute md:hidden brightness-50 lg:brightness-125 lg:left-1/2 left-96 z-[6] -translate-x-[103%] lg:block"
            src={hero}
            alt=""
          />
          <div className="left-0 top-0 block h-full w-full bg-[url('../../../assets/img/str2/samples/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-100">
            <div className="absolute inset-0 z-[1] bg-black mix-blend-color"></div>
            <div className="absolute inset-0 z-[2] mix-blend-multiply dark:bg-gray-800"></div>
            <div className="absolute inset-0 z-[3] opacity-40 mix-blend-screen dark:bg-[#283341]"></div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h1>
            Accept <span>Payments</span> Securely Through
          </h1>
        </div>
        <div></div>
      </section>
    </>
  );
};

export default Home;
