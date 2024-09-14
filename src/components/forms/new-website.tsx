"use client";

import React, { useState, useEffect } from "react";

import { Box, Button, Paper, Stepper, Step, StepLabel } from "@mui/material";

import { _GET_ALL_TEMPLATES } from "@/_services/GET_ALL_WEBSITES_TEMPLATES";

import { TemplateSelectionStep } from "@/components/steps/new-website/template-step";
import { TemplateCardSkeleton } from "../cards/template-site-card-skeleton";
import { SiteInformationStep } from "../steps/new-website/site-information-step";
import { ComplementaryStep } from "../steps/new-website/complementary-step";
import { ServiceStep } from "../steps/new-website/service-step";
import { useTemplateStore } from "@/_stores/new-website-store";

import AboutYouStep from "../steps/new-website/about-you-step";

import api from "@/_services/API";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

export function NewWebsiteForm() {
  const [step, setStep] = useState(0);
  const { selectedTemplateId, selectedTemplateName, siteName, authorName, crp } = useTemplateStore();
  const [isServiceStepValid, setIsServiceStepValid] = useState(false);
  const [isSiteInfoValid, setIsSiteInfoValid] = useState(false);
  const [isTemplateSelected, setIsTemplateSelected] = useState(false);
  const [isComplementaryValid, setIsComplementaryValid] = useState(false);
  const [isAboutYouValid, setIsAboutYouValid] = useState(false);

  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const steps = [
    "Template",
    "Nome do site",
    "Complementares",
    "Atendimento",
    "Sobre você",
  ];

  const { data: templates, isLoading } = _GET_ALL_TEMPLATES();
  
  const { push } = useRouter();

  useEffect(() => {
    if (step === 0) {
      setIsTemplateSelected(!!selectedTemplateName);
    } else if (step === 1) {
      setIsSiteInfoValid(!!siteName.trim() && !!selectedTemplateId);
    } else if (step === 2) {
      setIsComplementaryValid(
        !!authorName.trim() && !!crp.trim() && /^[0-9]{2}\/[0-9]{6}$/.test(crp)
      );
    }
  }, [step, siteName, selectedTemplateId, authorName, crp]);

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);

      try {
        const response = await api.post(
          "/website/add-website",
          {
            name: siteName,
            templateKind: selectedTemplateName,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.authorization}`,
            },
          }
        );
        const data = response.data;
        push(`/builder/${data.id}`);
      } catch (error) {
        console.error("Erro ao adicionar o site:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        if (isLoading) {
          return (
            <Box display="flex" flexWrap="wrap" gap={3}>
              {[1, 2].map((_, index) => (
                <TemplateCardSkeleton key={index} />
              ))}
            </Box>
          );
        }
        return <TemplateSelectionStep templateCards={templates?.data || []} />;
      case 1:
        return <SiteInformationStep />;
      case 2:
        return <ComplementaryStep />;
      case 3:
        return <ServiceStep onValidationChange={setIsServiceStepValid} />;
      case 4:
        return <AboutYouStep onValidationChange={setIsAboutYouValid} />;
      default:
        return "Etapa desconhecida.";
    }
  };

  return (
    <Box className="flex flex-col max-w-[auto]">
      <Paper className="p-6">
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(step)}

        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" disabled={step === 0} onClick={handleBack}>
            Voltar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={
              (step === 0 && !selectedTemplateName) ||
              (step === 1 && !isSiteInfoValid) ||
              (step === 2 && !isComplementaryValid) ||
              (step === 3 && !isServiceStepValid) ||
              (step === 4 && !isAboutYouValid)
            }
          >
            {loading
              ? "Carregando..."
              : step === steps.length - 1
              ? "FINALIZAR"
              : "CONTINUAR"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
