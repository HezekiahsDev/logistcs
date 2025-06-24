"use client";
import type React from "react";

export default function TrackingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-[#f3f2f7] min-h-screen">{children}</div>;
}
