import { setupWorker } from "msw/browser";
import { jobTitlesHandlers } from "./handlers/jobTitles";
import { branchesHandler } from './handlers/branches';
import { branchSettingsHandler } from './handlers/branchSettings'
import { branchCodesHandler } from "./handlers/branchCodes";
import { docTypesHandler } from "./handlers/docTypes";
import { docInfoHandler } from "./handlers/docInfo";
import { docsHandler } from "./handlers/docs";

export const worker = setupWorker(
    ...jobTitlesHandlers,
    ...branchesHandler,
    ...branchSettingsHandler,
    ...branchCodesHandler,
    ...docTypesHandler,
    ...docInfoHandler,
    ...docsHandler,
);
