"use client";

import AuthForm from "@/components/auth-form/auth-form";
import AuthPrompt from "@/components/auth-prompt/auth-prompt";
import { AuthType } from "@/types";
import { useState } from "react";

export default function LoginRegisterPage() {
  const [authType, setAuthType] = useState<AuthType>("LOGIN");
  const [promptType, setPromptType] = useState<AuthType>("REGISTER");

  const handleOnClick = () => {
    if (authType === "LOGIN" && promptType === "REGISTER") {
      setAuthType("REGISTER");
      setPromptType("LOGIN");
    } else {
      setAuthType("LOGIN");
      setPromptType("REGISTER");
    }
  };

  return (
    <div className="flex flex-column gap-30px m-auto">
      <AuthForm type={authType} />
      <AuthPrompt type={promptType} onClick={handleOnClick} />
    </div>
  );
}
