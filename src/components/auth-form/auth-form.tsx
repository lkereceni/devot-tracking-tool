"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { FC, FormEvent, useState } from "react";
import CardWrapper from "../card-wrapper/card-wrapper";
import { useRouter } from "next/navigation";
import signIn from "@/firebase/auth/sign-in";
import { appRoutes } from "@/constants";
import { AuthType } from "@/types";
import signUp from "@/firebase/auth/sign-up";

type AuthFormProps = {
  type: AuthType;
};

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    switch (type) {
      case "LOGIN":
        await signIn(email, password);
        break;
      case "REGISTER":
        await signUp(email, password);
        break;
    }

    return router.push(appRoutes.trackers);
  };

  const getLabel = () => {
    switch (type) {
      case "LOGIN":
        return "Login";
      case "REGISTER":
        return "Register";
    }
  };

  return (
    <CardWrapper className="flex flex-column align-items-center justify-content-center gap-49px pb-60px">
      <h5 className="text-center text-2xl font-bold text-ebony pt-44px">
        {getLabel()}
      </h5>
      <form className="flex flex-column px-35px" onSubmit={handleFormSubmit}>
        <InputText
          name="email"
          required
          type="email"
          autoFocus
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Password
          toggleMask
          feedback={false}
          name="password"
          required
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-30px"
        />
        <Button
          type="submit"
          label={getLabel()}
          className="bg-orange-500 mt-50px text-white cursor-pointer hover:bg-orange-700"
        />
      </form>
    </CardWrapper>
  );
};

export default AuthForm;
