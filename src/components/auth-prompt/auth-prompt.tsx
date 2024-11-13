import React, { FC } from "react";
import CardWrapper from "../card-wrapper/card-wrapper";
import nounUserIcon from "@/assets/icons/noun-user-icon.svg";
import Image from "next/image";
import { AuthType } from "@/types";
import Link from "next/link";

type AuthPromptProps = {
  type: AuthType;
  onClick: () => void;
};

const AuthPrompt: FC<AuthPromptProps> = ({ type, onClick }) => {
  const getText = () => {
    switch (type) {
      case "LOGIN":
        return "Already have an account?";
      case "REGISTER":
        return "Need an account?";
    }
  };

  const getLabel = () => {
    switch (type) {
      case "LOGIN":
        return "Log in here";
      case "REGISTER":
        return "Register here";
    }
  };

  return (
    <CardWrapper className="flex flex-row flex-wrap py-5">
      <Image
        width={95}
        height={95}
        src={nounUserIcon.src}
        alt="User icon"
        style={{ bottom: -7, left: 28 }}
      />
      <div className="flex flex-column m-auto">
        <p className="text-lynch text-18px font-semibold">{getText()}</p>
        <Link
          href={""}
          className="text-orange-500 underline cursor-pointer"
          onClick={onClick}
        >
          {getLabel()}
        </Link>
      </div>
    </CardWrapper>
  );
};

export default AuthPrompt;
