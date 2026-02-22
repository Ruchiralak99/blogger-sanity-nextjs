import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "81pswomh",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // අලුත්ම data ඉක්මනින් පේන්න false දාන්න
});