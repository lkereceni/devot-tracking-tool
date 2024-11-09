"use client";

import LoginForm from "@/components/login-form/login-form";
import RegistrationPrompt from "@/components/registration-prompt/registration-prompt";

export default function LoginPage() {
  return (
    <div className="flex flex-column gap-30px m-auto">
      <LoginForm />
      <RegistrationPrompt />
    </div>
  );
}
