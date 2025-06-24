import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "UbuntuPortal - Your Logistics Hub",
  description: "Explore a wide range of products from verified sellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
