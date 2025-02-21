import { ModuleLinks } from "@/constants/modules/links";
import { CoreTagLinks } from "./tags";
import { CoreContactLinks } from "./contacts";

const modulePrefix = "/modules/core";

export const CoreLinks: ModuleLinks[] = [
  {...CoreContactLinks(modulePrefix)},
  {...CoreTagLinks(modulePrefix)}
];