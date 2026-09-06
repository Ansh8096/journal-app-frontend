import WelcomeHero from "./WelcomeHero";
import EmptyStateCard from "../../common/EmptyStateCard";
import WhyJournalingCard from "./WhyJournalingCard";
import QuoteCard from "./QuoteCard";
import { firstTimeDashboardConfig } from "./config";
import GettingStarted from "./GettingStarted";

export default function FirstTimeDashboard() {
    return (
        <div className="space-y-6">

            <WelcomeHero />

            <EmptyStateCard
                title={firstTimeDashboardConfig.emptyState.title}
                description={
                    <>
                        {firstTimeDashboardConfig.emptyState.description.line1}
                            <br />
                        {firstTimeDashboardConfig.emptyState.description.line2}
                    </>
                }
                actionLabel={firstTimeDashboardConfig.emptyState.buttonText}
                actionLink={firstTimeDashboardConfig.emptyState.buttonLink}
                icon={firstTimeDashboardConfig.emptyState.icon}
            />

            <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">

                <WhyJournalingCard />

                <div className="space-y-6">

                    <QuoteCard />

                    <GettingStarted />

                </div>

            </div>

        </div>
    );
}