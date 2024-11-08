import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React from "react";
import CardWrapper from "../card-wrapper/card-wrapper";

const LoginForm = () => {
  return (
    <CardWrapper>
      <h5 className="text-center text-2xl font-bold text-ebony pt-44px">
        Login
      </h5>
      <form className="flex flex-column px-35px">
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
          className="bg-orange-500 mt-50px text-white font-bold py-2 cursor-pointer hover:bg-orange-700"
        />
      </form>
    </CardWrapper>
  );
};

export default LoginForm;
