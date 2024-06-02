import classes from "./HeroSection.module.css";
import arrowSvg from "../../assets/right-arrow-svgrepo-com.svg";
export default function HeroSection() {
  return (
    <main>
      <div className="">
        <h1 className="text-white mx-auto my-10 text-center text-3xl font-bold">
          Discover the Power of Fitness at Our Gym
        </h1>
      </div>
      <div className="flex justify-center gap-9 my-5">
        <a
          href="/auth"
          className="flex justify-center items-center gap-3 cursor-pointer  px-3 py-2 bg-cyan-900 rounded-xl hover:bg-cyan-500 border border-white"
        >
          <h1 className=" text-white font-semibold inline-block">
            Get Started{" "}
          </h1>
          <img src={arrowSvg} alt="arrow svg" />
        </a>
        {/* <a href="">
          <button>See how it works</button>{" "}
          <img src={arrowSvg} alt="arrow svg" />
        </a> */}
      </div>
    </main>
  );
}
