import { MapPin, Pencil, Sparkles } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { InfoRow } from "./InfoRow";
import { profileConfig } from "./Config";

type PreferencesCardProps = {
    onEdit?: () => void;
};

export function PreferencesCard({
    onEdit,
}: PreferencesCardProps) {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Card className="rounded-none">
            <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle>
                            {profileConfig.cards.preferences.title}
                        </CardTitle>

                        <CardDescription>
                            {profileConfig.cards.preferences.description}
                        </CardDescription>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onEdit}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <InfoRow

                    label={
                        <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4"/>
                            {profileConfig.labels.city}
                        </span>
                    }
                    value={user.city}
                />

                <InfoRow
                    label={
                        <span className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4"/>
                            {profileConfig.labels.sentimentAnalysis}
                        </span>
                    }
                    value={
                        user.sentimentAnalysisEnabled
                            ? "Enabled"
                            : "Disabled"
                    }
                />
            </CardContent>
        </Card>
    );
}