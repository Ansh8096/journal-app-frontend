import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/app/routes";

interface JournalDetailsErrorProps {
    onRetry: () => void;
}

export default function JournalDetailsError({
    onRetry,
}: JournalDetailsErrorProps) {
    const navigate = useNavigate();

    return (
        <Card className="border-destructive/20">
            <CardContent className="flex flex-col items-center px-8 py-16 text-center">
                <div className="mb-6 rounded-full bg-destructive/10 p-5">
                    <AlertTriangle className="h-10 w-10 text-destructive" />
                </div>

                <h2 className="text-2xl font-semibold">
                    We couldn't load this journal
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    The journal may have been removed, or there was a temporary
                    problem loading it. Please try again or return to your
                    journal list.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                        onClick={onRetry}
                        className="gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate(ROUTES.JOURNALS)
                        }
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Journals
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}