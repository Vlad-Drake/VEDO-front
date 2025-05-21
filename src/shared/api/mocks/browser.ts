import { setupWorker } from "msw/browser";
import { jobTitlesHandlers } from "./handlers/jobTitles";

export const worker = setupWorker(...jobTitlesHandlers);
