import { Mail, Pencil, User } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { InfoRow } from "./InfoRow";
import { profileConfig } from "./Config";

type PersonalInformationCardProps = {
    onEditUsername?: () => void;
    onEditEmail?: () => void;
};

export function PersonalInformationCard({
    onEditUsername,
    onEditEmail,
}: PersonalInformationCardProps) {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>
                    {profileConfig.cards.personalInformation.title}
                </CardTitle>

                <CardDescription>
                    {profileConfig.cards.personalInformation.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <InfoRow
                    label={
                        <span className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {profileConfig.labels.username}
                        </span>
                    }
                    value={user.username}
                    action={
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onEditUsername}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    }
                />

                <Separator />

                <InfoRow
                    label={
                        <span className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {profileConfig.labels.email}
                        </span>
                    }
                    value={user.email}
                    action={
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onEditEmail}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    }
                />
            </CardContent>
        </Card>
    );
}