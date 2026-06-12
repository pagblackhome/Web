import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "6vsy5lg8",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});