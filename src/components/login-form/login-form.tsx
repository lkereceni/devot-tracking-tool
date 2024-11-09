"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { FormEvent, useState } from "react";
import CardWrapper from "../card-wrapper/card-wrapper";
import { useRouter } from "next/navigation";
import signIn from "@/firebase/auth/sign-in";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await signIn(email, password);

    return router.push("/trackers");
  };

  return (
    <CardWrapper className="flex flex-column align-items-center justify-content-center gap-49px pb-60px">
      <h5 className="text-center text-2xl font-bold text-ebony pt-44px">
        Login
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
          label="Login"
          className="bg-orange-500 mt-50px text-white cursor-pointer hover:bg-orange-700"
        />
      </form>
    </CardWrapper>
  );
};

export default LoginForm;
