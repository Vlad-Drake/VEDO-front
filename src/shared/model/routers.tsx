import "react-router-dom";

export const ROUTES = {
  START: "/",
  HOME: "/home",
  REGISTATIONUSER: "/registation-user",
  LOGIN: "/login",
  DOCINFO: "/doc-info/:doctype",
  _DOCINFO: "/doc-info",
  ADMINPANEL: "/admin-panel",
  BRANCHES: "/branches/:branch",
  _BRANCHES: "/branches",
  TEMPLATESIGN: "template-sign",
  TASKS: "/tasks",
  DOCS: "/docs/:docstype",
  _DOCS: "/docs",
  GROUPCHANGEAPPROVER: "/group-change-approver",
} as const;

export type PathParams = {
  [ROUTES.DOCINFO]: {
    doctype: string;
  };
  [ROUTES.BRANCHES]: {
    branch: string;
  };
  [ROUTES.DOCS]: {
    docstype: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
