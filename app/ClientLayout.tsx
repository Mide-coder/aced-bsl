"use client";
// ACED — ClientLayout
// Wraps children with the route progress bar and global navbar

import { RouteLoader } from "../components/RouteLoader";
import { Navbar } from "../components/Navbar";
import { ReactNode } from "react";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RouteLoader />
      <Navbar />
      {children}
    </>
  );
}
