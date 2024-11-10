"use client";

import withAuth from "@/hoc/with-auth";
import { ReactNode } from "react";

function PagesLayout({ children }: { children: ReactNode }) {
  return <main className="pt-80px px-135px overflow-y-auto">{children}</main>;
}

export default withAuth(PagesLayout);
