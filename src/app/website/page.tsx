import React from "react";

import { Box } from "@mui/material";

import { Layout } from "@/components/ui/layout";

import { NewWebsiteForm } from "@/components/forms/new-website";
import { DomainManagementCard } from "@/components/cards/domain-card";

export default function WebsiteNewPage() {
  return (
    <main className="block w-screen h-screen">
      <Layout>
        <Box className="grid grid-cols-1 md:grid-cols-[auto] gap-4">
          <NewWebsiteForm />
        </Box>
      </Layout>
    </main>
  );
}
