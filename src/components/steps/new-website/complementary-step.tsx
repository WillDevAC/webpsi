import React, { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { formatCrp } from "@/_utils/format-crp";
import { useTemplateStore } from "@/_stores/new-website-store";

export function ComplementaryStep() {
  const { authorName, crp, setFormData } = useTemplateStore();
  const [localCrp, setLocalCrp] = React.useState(crp);
  const [isCrpValid, setIsCrpValid] = React.useState(true);

  const handleAuthorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ authorName: event.target.value });
  };

  const handleCrpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = formatCrp(event.target.value);
    setLocalCrp(value);
  };

  useEffect(() => {
    setFormData({ crp: localCrp });
    setIsCrpValid(/^\d{5}-\d{4}$/.test(localCrp));
  }, [localCrp, setFormData]);

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
    </Box>
  );
}
