"use client";

import withAuth from "@/hoc/with-auth";
import { ReactNode } from "react";

function PagesLayout({ children }: { children: ReactNode }) {
  return <main className="pt-7 md:px-8 px-3 overflow-y-auto">{children}</main>;
}

export default withAuth(PagesLayout);
