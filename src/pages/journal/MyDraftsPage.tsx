import AllDraftsSection from "@/components/journal/drafts/AllDraftsSection";
import ContinueWritingSection from "@/components/journal/drafts/ContinueWritingSection";
import DraftPageHeader from "@/components/journal/drafts/DraftPageHeader";
import DraftsOverviewCard from "@/components/journal/drafts/DraftsOverviewCard";
import PickUpDraftCard from "@/components/journal/drafts/PickUpDraftCard";
import RecentActivityCard from "@/components/journal/drafts/RecentActivityCard";
import WritingTipCard from "@/components/journal/drafts/WritingTipCard";
import AppLayout from "@/layouts/app/AppLayout";

export default function MyDrafts() {
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <DraftPageHeader />

                {/* Main page layout */}
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
                    {/* Main content */}
                    <main className="min-w-0 space-y-6">
                        <ContinueWritingSection />

                        <AllDraftsSection />
                    </main>

                    {/* Right sidebar */}
                    <aside className="min-w-0 space-y-6">
                        <DraftsOverviewCard />

                        <PickUpDraftCard />

                        <WritingTipCard />

                        <RecentActivityCard />
                    </aside>
                </div>
            </div>
        </AppLayout>
    );
}