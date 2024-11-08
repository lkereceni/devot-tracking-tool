import React from "react";
import CardWrapper from "../card-wrapper/card-wrapper";
import Link from "next/link";
import nounUserIcon from "@/assets/icons/noun-user-icon.svg";
import Image from "next/image";

const RegistrationPrompt = () => {
  return (
    <CardWrapper className="relative flex flex-row gap-34px py-5">
      <Image
        width={95}
        height={95}
        src={nounUserIcon.src}
        alt="User icon"
        className="absolute"
        style={{ bottom: -7, left: 28 }}
      />
      <div className="flex flex-column  m-auto">
        <p className="text-lynch text-18px font-semibold">Need an account?</p>
        <Link href={"/register"} className="text-orange-500 underline">
          Register here
        </Link>
      </div>
    </CardWrapper>
  );
};

export default RegistrationPrompt;
