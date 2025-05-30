import "react-router-dom";

export const ROUTES = {
  START: "/",
  HOME: "/home",
  REGISTATIONUSER: "/registation-user",
  LOGIN: "/login",
  DOCINFO: "/doc-info/:doctype",
  ADMINPANEL: "/admin-panel",
  BRANCHES: "/branches/:branch",
  TEMPLATESIGN: "template-sign",
  TASKS: "/tasks",
  DOCS: "/docs/:docstype",
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
