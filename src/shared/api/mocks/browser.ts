import { setupWorker } from "msw/browser";
import { jobTitlesHandlers } from "./handlers/jobTitles";
import { branchesHandler } from './handlers/branches';
import { signersHandler } from './handlers/signers'

export const worker = setupWorker(...jobTitlesHandlers, ...branchesHandler, ...signersHandler);
