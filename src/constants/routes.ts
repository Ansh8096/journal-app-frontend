export const ROUTES = {
    LOGIN: "/login",
    SIGNUP: "/signup",

    DASHBOARD: "/dashboard",
    JOURNALS: "/journals", // journals list 
    NEW_JOURNAL: "/journals/new",
    JOURNAL_DETAILS: "/journals/:journalId",
    EDIT_JOURNAL: "/journals/:journalId/edit",
    PROFILE: "/profile",
    SETTINGS: "/settings",

    DRAFTS: "/journals/drafts",
    DRAFTS2: "/journals/drafts2",
    EDIT_DRAFT: "/journals/drafts/:draftId/edit",
} as const;

export const buildJournalDetailsRoute = (journalId: string) =>
    `/journals/${journalId}`;

export const buildEditJournalRoute = (journalId: string,) =>
    `/journals/${journalId}/edit`;

export const buildEditDraftRoute = (draftId: string) =>
    `/journals/drafts/${draftId}/edit`;
