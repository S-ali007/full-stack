import React from "react";
import { Link } from "react-router-dom";

function Page_404() {
  return (
    <div className="flex justify-center items-center w-full h-[600px]  ">
        <div className="flex flex-col gap-4">
      <h1 className="  font-bold text-[22px]">PAGE NOT FOUND ERROR 404</h1>
      <p>
        We searched everywhere but couldn't find the page you
        were looking for.
      </p>
      <Link to="/login" className="underline">Go to Login Page</Link></div>
    </div>
  );
}

export default Page_404;