// SignupForm.tsx
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    ArrowRight,
    BarChart3,
    Mail,
    MapPin,
    Sparkles,
    User,
} from "lucide-react";

import AuthHeader from "./AuthHeader";
import PasswordInput from "./PasswordInput";

import {
    signupDefaultValues,
    signupSchema,
    type SignupFormValues,
} from "@/schemas/auth/auth.schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error";
import { applyServerFormError } from "@/lib/forms/server-form-error";
import GoogleLoginButton from "./GoogleLoginButton";
import { useEffect } from "react";

const SignupForm = () => {

    const navigate = useNavigate();

    const [
        searchParams,
    ] = useSearchParams();

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: signupDefaultValues,
    });

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    useEffect(() => {

    const error =
        searchParams.get(
            "error",
        );

    if (
        error === "account_not_found"
    ) {

        toast.info(
            "No JournalFlow account found.",
            {
                description:
                    "Please create your account using this signup form or Sign up with Google.",
            },
        );
    }

}, [searchParams]);

    const onSubmit = async (values: SignupFormValues): Promise<void> => {

        try {
            // today SignupFormValues and RegisterRequest is same, so we don't need to map them...
            await authService.signup(values);
            navigate(ROUTES.LOGIN, {
                replace: true,
                state: {
                    message: "Account created successfully. Please sign in.",
                },
            })

        } catch (error) {
            if (applyServerFormError(error, form)) return;
            toast.error(getErrorMessage(error));
        }

    };

    return (
        <Card className="rounded-2xl border-none shadow-xl shadow-violet-900/5 transition-shadow duration-200 ease-out">

            <CardContent className="px-8 py-3">

                <Form {...form}>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="space-y-5.5"
                    >

                        <AuthHeader
                            title={
                                <>
                                    Create Your Account
                                    <Sparkles className="h-5 w-5 text-violet-500" />
                                </>
                            }
                            description="Start your journaling journey today."
                        />

                        <fieldset className="space-y-5">

                            {/* Username + Email — now share a row instead
                                of stacking, which is most of the height
                                saved. Collapses to one column below sm so
                                it doesn't get cramped on mobile. */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <FormField
                                    control={control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormLabel>
                                                Username
                                            </FormLabel>

                                            <FormControl>

                                                <div className="relative">
                                                    <User
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                                    />

                                                    <Input
                                                        placeholder="Choose a username"
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
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormLabel>
                                                Email
                                            </FormLabel>

                                            <FormControl>

                                                <div className="relative">
                                                    <Mail
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                                    />

                                                    <Input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        autoComplete="email"
                                                        className="rounded-sm pl-10 transition-colors duration-200 ease-out"
                                                        {...field}
                                                    />
                                                </div>

                                            </FormControl>

                                            <FormMessage />

                                        </FormItem>
                                    )}
                                />

                            </div>

                            {/* City */}

                            <FormField
                                control={control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>
                                            City
                                        </FormLabel>

                                        <FormControl>

                                            <div className="relative">
                                                <MapPin
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                                />

                                                <Input
                                                    placeholder="Enter your city"
                                                    autoComplete="address-level2"
                                                    className="rounded-sm pl-10 transition-colors duration-200 ease-out"
                                                    {...field}
                                                />
                                            </div>

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            {/* Password */}

                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>
                                            Password
                                        </FormLabel>

                                        <FormControl>

                                            <PasswordInput
                                                placeholder="Create a password"
                                                autoComplete="new-password"
                                                className="rounded-sm"
                                                {...field}
                                            />

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            {/* Weekly Journal Insights */}

                            <FormField
                                control={control}
                                name="sentimentAnalysisEnabled"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-4 rounded-xl bg-violet-50/70 p-3.5 dark:bg-violet-950/20">

                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-600">
                                            <BarChart3 className="h-4 w-4 text-white" />
                                        </span>

                                        <div className="flex-1 space-y-1">

                                            <FormLabel>
                                                Weekly Journal Insights
                                            </FormLabel>

                                            <FormDescription>
                                                Receive a personalized weekly summary based on your journal entries.
                                            </FormDescription>

                                        </div>

                                        <FormControl>

                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="data-[state=checked]:bg-violet-600"
                                            />

                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                        </fieldset>

                        <Button
                            type="submit"
                            className="w-full mb-2 rounded-sm bg-gradient-to-r from-violet-600 to-purple-600 text-white transition-all duration-200 ease-out hover:from-violet-500 hover:to-purple-500 active:scale-[0.99]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                "Creating Account..."
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="ml-1.5 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <div
                            className="
                                relative
                                my-1.5
                                flex
                                items-center
                            "
                        >
                            <div className="flex-1 border-t" />

                            <span className="mx-4 text-xs text-muted-foreground">
                                OR
                            </span>

                            <div className="flex-1 border-t" />
                        </div>

                        <GoogleLoginButton mode="signup" />

                        {/*
                            GitHub signup intentionally ignored per your
                            instructions — no button, icon, handler, or
                            dependency.
                        */}

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                                                    
                            <Link
                                to={ROUTES.LOGIN}
                                className="font-medium text-violet-600 transition-colors duration-200 ease-out hover:text-violet-700 hover:underline"
                            >
                                Log in
                            </Link>
                        </div>
                    </form>

                </Form>

            </CardContent>

        </Card>
    );
};

export default SignupForm;