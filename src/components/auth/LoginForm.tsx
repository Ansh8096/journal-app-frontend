// LoginForm.tsx
import { useForm } from "react-hook-form";
import { ArrowRight, User } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import PasswordInput from "./PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginDefaultValues,
    loginSchema,
    type LoginFormValues,
} from "@/schemas/auth/auth.schema";

import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/app/routes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error";
import GoogleLoginButton from "./GoogleLoginButton";

const LoginForm = () => {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [
        searchParams,
    ] = useSearchParams();

    const location = useLocation();
    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
        }
    }, [location.state]);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: loginDefaultValues,
    });

    /*
     * UI-only "Remember me" state — not part of loginSchema/
     * LoginFormValues, whose shape I don't have visibility into.
     * Defaulted to true to visually match the Target UI's checked
     * state; wire this into your real login request once your
     * backend supports it.
     */
    const [rememberMe, setRememberMe] = useState(true);

    useEffect(() => {

        const message =
            searchParams.get(
                "message",
            );

        if (
            message === "account_exists"
        ) {

            toast.error(
                "Account already exists.",
                {
                    description:
                        "Please log in using your existing JournalFlow account.",
                },
            );
        }

        if (
            message === "google_account_created"
        ) {

            toast.success(
                "Account created successfully.",
                {
                    description:
                        "You can now continue with Google to log in.",
                },
            );
        }

    }, [searchParams]);

    const onSubmit = async (values: LoginFormValues): Promise<void> => {
        try {
            // today LoginFormValues and LoginRequest is same, so we don't need to map them...
            await login(values); // this method will login the user and will fetch its details for the dashboard internally...
            navigate(ROUTES.DASHBOARD, {
                replace: true, // without this user returns to /login, which doesn't make sense after authenticated...
            });

        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Card className="rounded-2xl border-none shadow-xl shadow-violet-900/5 transition-shadow duration-200 ease-out">

            <CardContent className="p-8">

                <Form {...form}>

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        noValidate
                        className="space-y-7"
                    >

                        {/* AuthHeader — copy updated to match Target UI:
                            hand-wave → heart, "Sign in..." →
                            "Log in to continue your journey." */}
                        <AuthHeader
                            title="Welcome back 💜"
                            description="Log in to continue your journey"
                        />

                        {/* Username and password input */}

                        <div className="space-y-5">

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>

                                        {/* Label/placeholder copy only —
                                            field name stays "username" so
                                            loginSchema/onSubmit are
                                            untouched. */}
                                        <FormLabel>
                                            Email or Username
                                        </FormLabel>

                                        <FormControl>

                                            <div className="relative">
                                                <User
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                                />

                                                <Input
                                                    autoFocus
                                                    placeholder="Enter your email or username"
                                                    autoComplete="username"
                                                    className="rounded-sm pl-10 transition-colors duration-200 ease-out"
                                                    {...field}
                                                />
                                            </div>

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>
                                            Password
                                        </FormLabel>

                                        <FormControl>

                                            <PasswordInput
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                className="rounded-sm"
                                                {...field}
                                            />

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-sm bg-gradient-to-r from-violet-600 to-purple-600 text-white transition-all duration-200 ease-out hover:from-violet-500 hover:to-purple-500 active:scale-[0.99]"
                            disabled={
                                form.formState.isSubmitting
                            }
                        >
                            {form.formState.isSubmitting ? (
                                "Signing In..."
                            ) : (
                                <>
                                    Log In
                                    <ArrowRight className="ml-1.5 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <div
                            className="
                                relative
                                my-2
                                flex
                                items-center
                            "
                        >
                            <div className="flex-1 border-t" />

                            <span className="mx-4 text-xs text-muted-foreground">
                                or continue with
                            </span>

                            <div className="flex-1 border-t" />
                        </div>

                        <GoogleLoginButton mode="login" />

                        {/*
                            GitHub login intentionally NOT added — no
                            button, icon, OAuth handler, or dependency.
                        */}

                        <div className="text-center text-sm text-muted-foreground">

                            Don't have an account?{" "}

                            <Link
                                to="/signup"
                                className="    
                                    font-medium
                                    text-violet-600
                                    dark:text-violet-400
                                    transition-colors
                                    duration-200
                                    ease-out
                                    hover:text-violet-700
                                    dark:hover:text-violet-300
                                    hover:underline"
                            >
                                Sign Up
                            </Link>

                        </div>

                    </form>

                </Form>

            </CardContent>

        </Card>
    );
};

export default LoginForm;