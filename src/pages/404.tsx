import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <h1 className="text-rose-500 font-semibold text-2xl">
        404!
        <span className="mt-4 text-xl text-rose-400 font-normal">
          {" "}
          PAGE NOT FOUND :(
        </span>
      </h1>
    </div>
  );
};

export default NotFound;
