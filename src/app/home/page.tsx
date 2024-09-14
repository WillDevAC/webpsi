import { ClientTabNavigation } from "@/components/tabs/client-navigation-tab";
import { DomainManagementCard } from "@/components/cards/domain-card";

import { UserGreeting } from "@/components/user-greeting";
import { StatisticsList } from "@/components/lists/statistics-list";

import { Layout } from "@/components/ui/layout";

import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <main className="block w-screen h-screen">
      <Layout>
        <Box className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4">
          <Box className="flex flex-col">
            <UserGreeting />
            <StatisticsList />
            <ClientTabNavigation />
          </Box>
          <DomainManagementCard />
        </Box>
      </Layout>
    </main>
  );
}
