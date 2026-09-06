import { useCallback, useState } from "react";

import {
    shareContent,
    type ShareContentOptions,
    type ShareContentResult,
} from "@/utils/journals/shareContent";

export function useShareJournal() {
    const [isSharing, setIsSharing] = useState(false);

    const share = useCallback(
        async (
            options: ShareContentOptions,
        ): Promise<ShareContentResult> => {
            setIsSharing(true);

            try {
                return await shareContent(options);
            } finally {
                setIsSharing(false);
            }
        },
        [],
    );

    return {
        share,
        isSharing,
    };
}