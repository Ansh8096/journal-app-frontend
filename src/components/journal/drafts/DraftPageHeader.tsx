import { FileText, Plus } from "lucide-react";
import { draftPageConfig } from "./Config";
import PageHeader from "@/components/common/PageHeader";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/app/routes";

export default function DraftPageHeader() {
    const navigate = useNavigate();

    return (
        <PageHeader
            title={draftPageConfig.header.title}
            description={draftPageConfig.header.description}
            icon={FileText}
            iconClassName="text-violet-600 dark:text-violet-400"
            actionLabel={"Create Journal"}
            actionIcon={Plus}
            actionClassName="
                bg-violet-600
                text-white
                hover:bg-violet-700
                dark:bg-violet-500
                dark:hover:bg-violet-400
            "
            onAction={() => {navigate(ROUTES.NEW_JOURNAL)}}
        />
    );
}