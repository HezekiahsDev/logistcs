import React from "react";

export default function ShipmentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="bg-gray-100 min-h-screen ">{children}</main>;
}
