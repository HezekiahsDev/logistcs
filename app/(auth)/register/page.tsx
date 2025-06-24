"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

// Step 1 Schema
const step1Schema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  job_title: z.string().min(2, "Job title is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^\+?[\d\s-]+$/, "Invalid phone number format"),
  role: z.enum(
    [
      "logistics_service_provider",
      "freight_forwarder",
      "beneficial_cargo_owner",
    ],
    {
      required_error: "Please select a role",
    }
  ),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

// Step 2 Schema (Freight Forwarder)
const step2Schema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  address: z.string().min(5, "Address is required"),
  country: z.string().min(2, "Country is required"),
  company_website: z
    .string()
    .url("Please enter a valid website URL")
    .refine(
      (url: string) => url.startsWith("http://") || url.startsWith("https://"),
      {
        message: "Must include http:// or https://",
      }
    ),
});

type Step1FormValues = z.infer<typeof step1Schema>;
type Step2FormValues = z.infer<typeof step2Schema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1FormValues | null>(null);
  const [step2Data, setStep2Data] = useState<Step2FormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const step1Form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      full_name: "",
      email: "",
      job_title: "",
      password: "",
      phone: "",
      role: undefined,
      terms: false,
    },
  });

  const step2Form = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      company_name: "",
      address: "",
      country: "",
      company_website: "",
    },
  });

  const selectedRole = step1Form.watch("role");

  const onStep1Submit = async (data: Step1FormValues) => {
    const { terms, ...signUpData } = data;
    if (!terms) {
      toast.error("Please agree to the terms");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      setStep1Data(data);

      if (data.role === "freight_forwarder") {
        // When moving to step 2, restore form data if it exists, otherwise reset
        step2Form.reset(
          step2Data ?? {
            company_name: "",
            address: "",
            country: "",
            company_website: "",
          }
        );

        // Small delay to ensure form is reset before transition
        setTimeout(() => {
          setCurrentStep(2);
        }, 100);
        return;
      }

      console.log("Regular signup with data:", signUpData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/registration/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Signup failed:", errorText);
        const errorMessage =
          response.status === 401
            ? "Unauthorized: Please check your credentials."
            : `Signup failed: ${response.statusText}`;
        toast.error(errorMessage);
        return;
      }

      const result = await response.json();
      console.log("Signup successful:", result);
      toast.success(
        "Signup successful! Please check your email for verification."
      );
      router.push("/verify-account");
    } catch (error) {
      console.error("Step 1 submission error:", error);
      setSubmissionError("Failed to process signup. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onStep2Submit = async (data: Step2FormValues) => {
    if (!step1Data) {
      step1Form.setError("root", { message: "Missing initial form data" });
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const { terms, ...signUpData } = step1Data;
      const completeData = { ...signUpData, ...data };
      if (!terms) {
        toast.error("Please agree to the terms");
        return;
      }

      console.log("Step 2 Submitted:", data);
      console.log("Freight Forwarder signup with complete data:", completeData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/freight-forwarder-registration/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completeData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Freight Forwarder signup failed:", errorText);
        toast.error(`Signup failed: ${response.statusText}`);
        return;
      }

      const result = await response.json();
      console.log("Freight Forwarder signup successful:", result);
      toast.success(
        "Signup successful! Please check your email for verification."
      );
      router.push("/verify-account");
    } catch (error) {
      setSubmissionError("Failed to complete signup. Please try again.");
      console.error("Step 2 submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevStep = () => {
    // Save current step 2 form data before going back
    const currentStep2Values = step2Form.getValues();
    setStep2Data(currentStep2Values);

    setCurrentStep(1);
    setSubmissionError(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center  bg-gray-50">
      <Card className="my-10 w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            {currentStep === 1
              ? "Enter your information to get started with LogiTrack"
              : "Please provide additional company information"}
          </CardDescription>

          {selectedRole === "freight_forwarder" && (
            <div
              aria-live="polite"
              className="flex items-center justify-center mt-2"
            >
              <span className="sr-only">Step {currentStep} of 2</span>
              <div className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
                </div>
                <div
                  className={`h-1 w-10 ${
                    currentStep > 1 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  2
                </div>
              </div>
            </div>
          )}
        </CardHeader>

        {submissionError && (
          <div className="px-6 text-sm font-medium text-destructive">
            {submissionError}
          </div>
        )}

        {currentStep === 1 ? (
          <Form {...step1Form}>
            <form
              id="signup-step1-form"
              onSubmit={step1Form.handleSubmit(onStep1Submit)}
            >
              <CardContent className="space-y-1">
                {step1Form.formState.errors.root && (
                  <p className="text-sm font-medium text-destructive">
                    {step1Form.formState.errors.root.message}
                  </p>
                )}

                <FormField
                  control={step1Form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@company.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="job_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Logistics Manager"
                          autoComplete="organization-title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 123-4567"
                          type="tel"
                          autoComplete="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            aria-describedby="password-requirements"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <div
                        id="password-requirements"
                        className="text-xs text-muted-foreground mt-1"
                      >
                        Must be 8+ chars with uppercase, number, and special
                        char
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select your role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beneficial_cargo_owner">
                            Beneficial Cargo Owner
                          </SelectItem>
                          <SelectItem value="freight_forwarder">
                            Freight Forwarder
                          </SelectItem>
                          <SelectItem value="logistics_service_provider">
                            Logistics Service Provider
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-blue-600 hover:underline"
                          >
                            terms of service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-blue-600 hover:underline"
                          >
                            privacy policy
                          </Link>
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-4">
                      <Loader className="animate-spin" /> Creating
                    </span>
                  ) : selectedRole === "freight_forwarder" ? (
                    <span className="flex items-center">
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        ) : (
          <Form {...step2Form} key="step2-form">
            <form
              id="signup-step2-form"
              onSubmit={step2Form.handleSubmit(onStep2Submit)}
            >
              <CardContent className="space-y-4">
                {step2Form.formState.errors.root && (
                  <p className="text-sm font-medium text-destructive">
                    {step2Form.formState.errors.root.message}
                  </p>
                )}

                <FormField
                  control={step2Form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Logistics Inc."
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step2Form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Business St, City, State"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step2Form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="United States"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step2Form.control}
                  name="company_website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          type="url"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="flex w-full gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-4">
                        <Loader className="animate-spin" /> Processing
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
}
