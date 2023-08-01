import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import {visionTool} from '@sanity/vision'
import {schemaTypes} from "./schemas";

const config = defineConfig({
  projectId: 'bwr4gdib',
    dataset: 'production',
  title: "My personal website",
  apiVersion: "2023-07-20",
  basePath: "/admin",
  plugins: [deskTool(),visionTool()],
  schema: {
    types: schemaTypes,
  },
});

export default config;
