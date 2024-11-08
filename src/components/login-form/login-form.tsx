"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { FormEvent } from "react";
import CardWrapper from "../card-wrapper/card-wrapper";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const formSubmitHandle = (event: FormEvent) => {
    event.preventDefault();
    router.push("/trackers");
  };

  return (
    <CardWrapper className="flex flex-column align-items-center justify-content-center gap-49px pb-60px">
      <h5 className="text-center text-2xl font-bold text-ebony pt-44px">
        Login
      </h5>
      <form className="flex flex-column px-35px" onSubmit={formSubmitHandle}>
        <InputText name="username" autoFocus placeholder="Username" />
        <Password
          toggleMask
          feedback={false}
          placeholder="Password"
          className="mt-30px"
        />
        <Button
          type="submit"
          label="Login"
          className="bg-orange-500 mt-50px text-white cursor-pointer hover:bg-orange-700"
        />
      </form>
    </CardWrapper>
  );
};

export default LoginForm;
