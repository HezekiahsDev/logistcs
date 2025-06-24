import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UbuntuPortal - Your Logistics Hub",
  description: "Explore a wide range of products from verified sellers.",
};
function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <header>
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="text-xl font-bold text-gray-900">
                  UbuntuPortal
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {children}
    </main>
  );
}

export default AuthLayout;
