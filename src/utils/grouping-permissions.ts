import { components } from "@/libs/api/schema/uam";

type App = string;
type Module = string;
type Submodule = string;
type ActionDetail = { pk: number; action: string }[];

export const groupPermissions = (
  permissions: components["schemas"]["Permission"][]
): Record<App, Record<Module, Record<Submodule, ActionDetail>>> => {
  return permissions.reduce((acc, permission) => {
    const { app, module, submodule, action, pk } = permission;

    if (!acc[app]) acc[app] = {};

    if (!acc[app][module]) acc[app][module] = {};

    if (!acc[app][module][submodule]) acc[app][module][submodule] = [];
    
    acc[app][module][submodule].push({ pk, action });

    return acc;
  }, {} as Record<App, Record<Module, Record<Submodule, ActionDetail>>>);
};
