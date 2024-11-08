"use client";

import LoginForm from "@/components/login-form/login-form";
import RegistrationPrompt from "@/components/registration-prompt/registration-prompt";

export default function LoginPage() {
  return (
    <main className="m-auto flex flex-column gap-30px">
      <LoginForm />
      <RegistrationPrompt />
    </main>
  );
}
