import { useAuth } from "@/hooks/useAuth";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { InfoRow } from "./InfoRow";
import { profileConfig } from "./Config";
import { formatDate } from "@/utils/date";
import { CalendarDays } from "lucide-react";

export function AccountInformationCard() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>
                    {profileConfig.cards.accountInformation.title}
                </CardTitle>

                <CardDescription>
                    {profileConfig.cards.accountInformation.description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <InfoRow
                    label={
                        <span className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4"/>
                            {profileConfig.labels.accountCreated}
                        </span>
                    }
                    value={formatDate(user.createdAt)}
                />
            </CardContent>
        </Card>
    );
}