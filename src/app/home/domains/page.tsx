"use client";

import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  ListItemIcon,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormHelperText,
} from "@mui/material";
import {
  Home as HomeIcon,
  Dns as DnsIcon,
  Add as AddIcon,
  Rule as RuleIcon,
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Layout } from "@/components/ui/layout";
import { _GET_ALL_DOMAINS } from "@/_services/GET_ALL_DOMAINS";
import api from "@/_services/API";
import { useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { GetAllWebsitesList } from "@/_services/GET_ALL_WEBSITES";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
  [key: string]: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DomainsPage() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentDomain, setCurrentDomain] = useState<null | any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDNSDialog, setOpenDNSDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [newDomain, setNewDomain] = useState("");
  const [selectedNewSite, setSelectedNewSite] = useState("");
  const [domainError, setDomainError] = useState("");
  const [siteError, setSiteError] = useState("");
  const [domainId, setDomainId] = useState("");

  const { data: domains = [], isLoading } = _GET_ALL_DOMAINS();
  const { data: sites, isLoading: isLoadingWebsite } = GetAllWebsitesList();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleAddDomain = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDomainError("");
    setSiteError("");
  };

  const handleDeleteDomain = async (id: string) => {
    try {
      await api.delete(`/website/domain/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      queryClient.invalidateQueries("get-all-domains");

      handleConfirmDialogClose();
    } catch (error) {
      console.error("Erro ao excluir o domínio:", error);
    }
  };

  const handleDNSDialogClose = () => {
    setOpenDNSDialog(false); // Close DNS dialog
  };

  const handleConfirmDialogClose = () => {
    setOpenConfirmDialog(false); // Close Confirmation dialog
  };

  const handleSiteChange = (event: any) => {
    setSelectedSite(event.target.value as string);
  };

  const handleActionClick = (
    event: React.MouseEvent<HTMLElement>,
    domain: any
  ) => {
    setCurrentDomain(domain);
    setDomainId(domain);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentDomain(null);
  };

  const handleMenuItemClick = (action: "details" | "remove") => {
    if (action === "details") {
      setOpenDNSDialog(true); // Open the DNS modal on "Detalhes" click
    } else if (action === "remove") {
      setOpenConfirmDialog(true);
    }
    handleCloseMenu();
  };

  const open = Boolean(anchorEl);

  const validateDomain = (domain: string) => {
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const { data: session } = useSession();

  const token = session?.authorization;

  const queryClient = useQueryClient();

  const handleAddNewDomain = async () => {
    setDomainError("");
    setSiteError("");

    if (!validateDomain(newDomain)) {
      setDomainError("Formato de domínio inválido");
      return;
    }

    if (!selectedNewSite) {
      setSiteError("Por favor, selecione um site vinculado");
      return;
    }

    try {
      const response = await api.post(
        `/website/domain`,
        {
          domain: newDomain,
          websiteId: selectedNewSite,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      queryClient.invalidateQueries("get-all-domains");

      handleDialogClose();
      setOpenDNSDialog(true); // Open DNS dialog after adding new domain
    } catch (error) {
      console.error("Failed to add the domain:", error);
    }
  };

  return (
    <main className="block w-screen h-screen">
      <Layout>
        <Box className="grid grid-cols-1 md:grid-cols-[auto] gap-4 items-center">
          <Box>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="tabs example"
            >
              <Tab
                label="Meus Domínios"
                icon={<HomeIcon />}
                iconPosition="start"
              />
              <Tab label="DNS" icon={<DnsIcon />} iconPosition="start" />
            </Tabs>
          </Box>

          <Box className="flex gap-2 items-center justify-end">
            {tabIndex === 0 ? (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddDomain}
              >
                Novo Domínio
              </Button>
            ) : tabIndex === 1 ? (
              <>
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 200 }}
                >
                  <InputLabel id="site-select-label">Site</InputLabel>
                  <Select
                    labelId="site-select-label"
                    value={selectedSite}
                    onChange={handleSiteChange}
                    label="Site"
                  >
                    {sites?.data.map((site: any) => (
                      <MenuItem value={site.id} key={site.id}>
                        {site.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<RuleIcon />}
                  onClick={() => console.log("Add new rule")}
                >
                  Adicionar Regra
                </Button>
              </>
            ) : null}
          </Box>

          <TabPanel value={tabIndex} index={0}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Domínio</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    Array.from(new Array(5)).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton width="80%" />
                        </TableCell>
                        <TableCell>
                          <Skeleton width="60%" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : domains.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        Nenhum domínio encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    domains.map((domain: any) => (
                      <TableRow key={domain.id}>
                        <TableCell>{domain.domain}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(e) => handleActionClick(e, domain.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => handleMenuItemClick("details")}>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                Detalhes
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("remove")}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                Remover
              </MenuItem>
            </Menu>
          </TabPanel>

          <TabPanel value={tabIndex} index={1}>
            <h2>Configurações de DNS</h2>
          </TabPanel>
        </Box>
      </Layout>

      {/* Diálogo de Adicionar Domínio */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Adicionar Novo Domínio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os detalhes para adicionar um novo domínio.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Domínio"
            type="text"
            fullWidth
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            error={!!domainError}
            helperText={domainError}
          />
          <FormControl fullWidth margin="dense" error={!!siteError}>
            <InputLabel id="site-select-new-label">Site Vinculado</InputLabel>
            <Select
              labelId="site-select-new-label"
              value={selectedNewSite}
              onChange={(e) => setSelectedNewSite(e.target.value)}
              label="Site Vinculado"
            >
              {sites?.data.map((site: any) => (
                <MenuItem value={site.id} key={site.id}>
                  {site.name}
                </MenuItem>
              ))}
            </Select>
            {siteError && <FormHelperText>{siteError}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button onClick={handleAddNewDomain}>Adicionar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Configurações de DNS */}
      <Dialog open={openDNSDialog} onClose={handleDNSDialogClose}>
        <DialogTitle>Configurações de DNS</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Configure seu domínio! Vá ao local onde comprou seu domínio e
            adicione essas configurações de DNS (add record DNS).
          </DialogContentText>

          <div className="space-y-4 mt-4">
            <div className="flex gap-2 flex-col">
              <InputLabel>Type</InputLabel>
              <TextField value="A" InputProps={{ readOnly: true }} />
            </div>

            <div className="flex gap-2 flex-col">
              <InputLabel>Name</InputLabel>
              <TextField value="@" InputProps={{ readOnly: true }} />
            </div>

            <div className="flex gap-2 flex-col">
              <InputLabel>Content</InputLabel>
              <TextField
                value="213.199.51.233"
                InputProps={{ readOnly: true }}
              />
            </div>

            <div className="flex gap-2 flex-col">
              <InputLabel>TTL</InputLabel>
              <TextField value="3600" InputProps={{ readOnly: true }} />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDNSDialogClose}>
            JÁ FIZ ESSA CONFIGURAÇÃO
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Confirmação */}
      <Dialog open={openConfirmDialog} onClose={handleConfirmDialogClose}>
        <DialogTitle>Excluir Domínio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir o domínio {currentDomain?.domain}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose}>Cancelar</Button>
          <Button
            onClick={() => {
              handleDeleteDomain(domainId);
              handleConfirmDialogClose();
            }}
            color="error"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
