import FirstTimeDashboard from "@/components/dashboard/first-time/FirstTimeDashboard";
import RegularDashboard from "@/components/dashboard/regular/RegularDashboard";

import AppLayout from "@/layouts/app/AppLayout";

import { useJournalList } from "@/hooks/journal";

function DashboardPage() {
    const {
        data,
        isLoading,
        isError,
    } = useJournalList({
        page: 0,
        size: 1,
    });

    /*
     * We only need to know whether at least one
     * journal exists.
     *
     * totalElements is preferable to checking
     * data.journals.length because the backend
     * already provides the total count.
     */
    const hasJournals =
        (data?.totalElements ?? 0) > 0;

    /*
     * While the journal query is loading,
     * don't prematurely show the first-time
     * dashboard. We haven't determined the
     * user's state yet.
     */
    if (isLoading) {
        return (
            <AppLayout>
                <div className="space-y-6">
                    {/* Keep the dashboard area stable while loading */}
                </div>
            </AppLayout>
        );
    }

    /*
     * If the request fails, we should avoid
     * assuming that the user has no journals.
     *
     * Showing the regular dashboard is safer
     * because an API failure does not mean
     * "first-time user".
     */
    if (isError) {
        return (
            <AppLayout>
                <RegularDashboard />
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            {hasJournals ? (
                <RegularDashboard />
            ) : (
                <FirstTimeDashboard />
            )}
        </AppLayout>
    );
}

export default DashboardPage;