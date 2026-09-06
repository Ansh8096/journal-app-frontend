import DashboardLayout from "@/layouts/app/AppLayout";

import SettingsHeader from "@/components/settings/SettingsHeader";
import AppearanceCard from "@/components/settings/AppearanceCard";
import DangerZoneCard from "@/components/settings/DangerZoneCard";

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="mx-auto w-full max-w-6xl space-y-8">
                {/* Header */}
                <SettingsHeader />

                {/* Appearance */}
                <AppearanceCard />

                {/* Danger Zone */}
                <DangerZoneCard />
            </div>
        </DashboardLayout>
    );
}