import { Settings } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";

export default function SettingsHeader() {
    return (
        <PageHeader
            title="Settings"
            description="Manage your preferences and account settings."
            icon={Settings}
            iconClassName="text-violet-600"
        />
    );
}