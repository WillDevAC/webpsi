"use client";

import { Card, Grid } from "@mui/material";
import { LoginForm } from "@/components/forms/login-form";
import { FeatureSection } from "@/components/feature-section";

export default function AuthPage() {
  return (
    <>
      <div className="flex justify-center items-center bg-gradient-to-r from-[#a023da] via-[#a023da] to-[#6c1b92] w-screen h-screen">
        <Card
          sx={{
            maxWidth: 1300,
            width: "100%",
            display: "flex",
            overflow: "hidden",
            boxShadow: "none",
            backgroundColor: "transparent",
          }}
        >
          <Grid container spacing={3}>
            <Grid
              item
              xs={0}
              md={6}
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FeatureSection />
            </Grid>
            <Grid item xs={12} md={5}>
              <LoginForm />
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
}
