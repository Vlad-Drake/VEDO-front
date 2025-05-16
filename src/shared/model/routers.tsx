import "react-router-dom";

export const ROUTES = {
    START: '/',
    HOME: "/home",
    REGISTATIONUSER: "/registation-user",
    LOGIN: "/login",
    INFO: "/info",
    DOCINFO: "/doc-info/:doctype",
    ADMINPANEL: "/admin-panel",
    BRANCHES: "/branches/:branch",
    TEMPLATESIGN: "template-sign"
} as const;

export type PathParams = {
    [ROUTES.DOCINFO]: {
        doctype: string;
    },
    [ROUTES.BRANCHES]: {
        branch: string;
    },
};

declare module "react-router-dom" {
    interface Register {
        params: PathParams;
    }
}