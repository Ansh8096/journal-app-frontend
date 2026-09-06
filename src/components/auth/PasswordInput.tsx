// PasswordInput.tsx
import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps
    extends React.ComponentPropsWithoutRef<typeof Input> {}

const PasswordInput = React.forwardRef<
    React.ComponentRef<typeof Input>,
    PasswordInputProps
>(({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative">

            <Lock
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />

            <Input
                ref={ref}
                type={showPassword ? "text" : "password"}
                className={cn(
                    /*
                     * rounded-lg override — the Target UI's inputs are
                     * a compact rounded-rectangle, not the pill shape
                     * your screenshot shows. This assumes your ui/input
                     * primitive is built with tailwind-merge-aware
                     * cn(), so a later rounded-lg wins over whatever
                     * radius the primitive defaults to. If the input
                     * still renders as a pill after this, the actual
                     * fix belongs in ui/input.tsx itself.
                     */
                    "rounded-lg pl-10 pr-10 transition-colors duration-200 ease-out",
                    className,
                )}
                {...props}
            />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground transition-colors duration-200 ease-out hover:bg-transparent hover:text-foreground"
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
    );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;