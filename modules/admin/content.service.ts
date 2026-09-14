import "server-only";
import { findAdminContent } from "./content.repository";
import type { AdminListQuery,AdminResource } from "./content.validation";
export async function getAdminContent(resource:AdminResource,query:AdminListQuery){return findAdminContent(resource,query);}
