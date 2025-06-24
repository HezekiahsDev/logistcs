"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/components/ui/icons";

export default function VerifyAccount() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const redirectTime = 7000; // 7 seconds
    const interval = 100; // Update progress every 100ms
    let elapsedTime = 0;

    const timer = setInterval(() => {
      elapsedTime += interval;
      setProgress((elapsedTime / redirectTime) * 100);

      if (elapsedTime >= redirectTime) {
        clearInterval(timer);
        router.push("/login");
      }
    }, interval);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo_complete.png"
              width={180}
              height={60}
              alt="UbuntuPortal Logo"
              className="w-auto h-12"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <Icons.mail className="mx-auto h-12 w-12 text-blue-500" />
            <p className="text-base text-gray-600">
              Please check your email to verify your account. We&apos;ve sent
              you a message with a verification link.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500 text-center">
              Redirecting to login page in{" "}
              {Math.ceil(((100 - progress) / 100) * 7)} seconds...
            </p>
            <Progress value={progress} className="w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
