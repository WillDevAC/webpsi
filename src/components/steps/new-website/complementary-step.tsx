import React, { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { formatCrp } from "@/_utils/format-crp";
import { useTemplateStore } from "@/_stores/new-website-store";

export function ComplementaryStep() {
  const { authorName, crp, instagram, workingHours, setFormData } = useTemplateStore();
  const [localCrp, setLocalCrp] = React.useState(crp);
  const [isCrpValid, setIsCrpValid] = React.useState(true);
  const [localInstagram, setLocalInstagram] = React.useState(instagram);
  const [isInstagramValid, setIsInstagramValid] = React.useState(true);
  const [localWorkingHours, setLocalWorkingHours] = React.useState(workingHours);
  const [isWorkingHoursValid, setIsWorkingHoursValid] = React.useState(true);

  const handleAuthorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ authorName: event.target.value });
  };

  const handleCrpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = formatCrp(event.target.value);
    setLocalCrp(value);
  };

  const handleInstagramChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInstagram(event.target.value);
  };

  const handleWorkingHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalWorkingHours(event.target.value);
  };

  useEffect(() => {
    setFormData({ crp: localCrp });
    setIsCrpValid(/^\d{5}-\d{4}$/.test(localCrp));
  }, [localCrp, setFormData]);

  useEffect(() => {
    setFormData({ instagram: localInstagram });
    setIsInstagramValid(/^@[\w.-]+$/.test(localInstagram));
  }, [localInstagram, setFormData]);

  useEffect(() => {
    setFormData({ workingHours: localWorkingHours });
    setIsWorkingHoursValid(localWorkingHours.trim() !== ""); 
  }, [localWorkingHours, setFormData]);

  return (
    <Box mt={5}>
      <Typography variant="h6">Informações complementares:</Typography>

      <TextField
        fullWidth
        label="Seu nome"
        name="authorName"
        value={authorName}
        onChange={handleAuthorNameChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="CRP"
        name="crp"
        value={localCrp}
        onChange={handleCrpChange}
        margin="normal"
        inputProps={{ maxLength: 9 }}
        error={!isCrpValid}
        helperText={!isCrpValid ? "Exemplo: 12/345678" : ""}
      />

      <TextField
        fullWidth
        label="Instagram"
        name="instagram"
        value={localInstagram}
        onChange={handleInstagramChange}
        margin="normal"
        placeholder="@"
        inputProps={{ maxLength: 30 }}
        error={!isInstagramValid}
        helperText={!isInstagramValid ? "Instagram inválido. Exemplo: @usuario" : ""}
      />

      <TextField
        fullWidth
        label="Horário de atendimento"
        name="workingHours"
        value={localWorkingHours}
        onChange={handleWorkingHoursChange}
        margin="normal"
        placeholder="Das 13h até as 18:00h"
        error={!isWorkingHoursValid}
        helperText={!isWorkingHoursValid ? "Horário de atendimento não pode ficar vazio." : ""}
      />
    </Box>
  );
}
