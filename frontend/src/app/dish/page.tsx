'use client'
import { Alert, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, Grid, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Select, Snackbar, Stack, TextField, Typography } from '@mui/material'
import styles from './dish.module.css'
import Chart from 'react-google-charts';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import React from 'react';
import Image from 'next/image';


export default function DishPage() {
  const [openModal, setOpenModal] = React.useState(false);
  
  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const [openToast, setOpenToast] = React.useState(false);
  const [openErrorToast, setOpenErrorToast] = React.useState(false);
  
  const handleClickToast = (isError = false) => {
    isError ? setOpenErrorToast(true) : setOpenToast(true);
    setOpenModal(false);
  };

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorToast(false)
    setOpenToast(false);
  };
  
  const cardAvailableClass = `${styles.cardContainer} ${styles.cardAvailable}`
  const cardAlertClass = `${styles.cardContainer} ${styles.cardAlert}`
  const cardErrorClass = `${styles.cardContainer} ${styles.cardError}`
  const dataLineChart = [
    ["Mounth", "Strogonoff", "Bife à milanesa", "Filé de frango", "Bife à parmegiana", "Filé de peixe", "Bife bovino", "Salada da casa"],
    ["Jan", 91, 85, 70, 65, 55, 75, 88],
    ["Fev", 78, 77, 68, 62, 58, 68, 75],
    ["Mar", 88, 66, 64, 68, 62, 64, 80],
    ["Abr", 80, 75, 75, 65, 54, 58, 98],
    ["Jun", 84, 78, 68, 70, 58, 68, 90],
    ["Jul", 90, 80, 64, 72, 60, 70, 85],
  ];
  const dataLineOptions = {
    curveType: "function",
    legend: { position: "bottom" },
  };
   const data = [
    ["Task", "Hours per Day"],
    ["Almoço", 65],
    ["Janta", 48],
    ["Café da manhã", 25],
    ["Café da tarde", 18],
    ["Piscina", 15],
  ];

  const CustomizedSnackbars = () => {
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={openToast} autoHideDuration={3000} onClose={handleCloseToast}>
          <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }} >
            Prato criado com sucesso!
          </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={openErrorToast} autoHideDuration={3000} onClose={handleCloseToast}>
          <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }} >
            Prato exlcuído com sucesso!
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
        <Alert severity="success">This is a success message!</Alert> */}
      </Stack>
    );
  }

  const AddFormDialog = () => {
    return (
      <div>
        <Dialog open={openModal} onClose={handleClose}>
          <DialogContent >
            <Grid container direction="column" spacing={3}>
              <Grid item xs={12}>
                <input
                  color="primary"
                  accept="image/*"
                  type="file"
                  id="icon-button-file"
                  style={{ display: 'none', }}
                />
                <label htmlFor="icon-button-file">
                  <div className={styles.browseFileContainer}>
                    <Image
                      priority
                      src="upload-file.svg"
                      height={64}
                      width={64}
                      alt="Follow us on Twitter"
                    />
                    <Typography>
                      Selecione uma imagem
                    </Typography>
                  </div>
                </label>
              </Grid>
              <Grid item xs>
                <Grid container spacing={2} justifyContent="center" alignContent="center">
                  <Grid item>
                    <TextField
                      autoFocus
                      id="name"
                      label="Nome do prato"
                      type="email"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <Select
                      placeholder='Variante'
                      label="Variante"
                      value="Variante X"
                    >
                      <MenuItem value={'Variante X'}>Variante X</MenuItem>
                      <MenuItem value={'Variante Y'}>Variante Y</MenuItem>
                      <MenuItem value={'Variante Z'}>Variante Z</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  label="Descrição"
                  multiline
                  rows={3}
                  defaultValue="Escreva aqui uma descrição para o prato."
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Modo Preparo"
                  multiline
                  rows={4}
                  defaultValue="Escreva aqui o modo de preparo."
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color='error' onClick={handleClose}>Cancelar</Button>
            <Button color='success' onClick={() => handleClickToast()}>Criar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <main className={styles.mainContainer}>
      <CustomizedSnackbars />
      <AddFormDialog />
      <Grid container xs direction="column">
        <Grid item>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Olá, acompanhe sua cozinha!
          </Typography>
        </Grid>

        <Grid item>
          {/* widgets advises */}
          <Grid container spacing={6} justifyContent="center">
            <Grid item md={4}>
              <Card className={cardAvailableClass}>
                <div className={styles.cardIconWrapper}><TaskAltRoundedIcon /></div>
                <p>16 un</p>
                <span>Pratos Disponíveis</span>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card className={cardAlertClass}>
                <div className={styles.cardIconWrapper}><PriorityHighRoundedIcon /></div>
                <p>4 un</p>
                <span>Alerta Estoque de Insumo</span>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card className={cardErrorClass}>
                <div className={styles.cardIconWrapper}><ReportProblemRoundedIcon /></div>
                <p>2 un</p>
                <span>Insumos sem Estoque</span>
              </Card>
            </Grid>
          </Grid>
        
          {/* chart */}
          <Grid container spacing={6}>
            {/* chart line */}
            <Grid item md={8}>
              <Grid container xs direction="column">
                <Grid item xs>
                  <Typography variant="h5" sx={{ mb: 4, mt: 4 }}>
                    Consumo nos últimos 6 meses
                  </Typography>
                </Grid>
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="400px"
                  data={dataLineChart}
                  options={dataLineOptions}
                />
              </Grid>
            </Grid>
            {/* chart pie */}
            <Grid item md={4}>
              <Grid container xs direction="column">
                <Grid item xs>
                  <Typography variant="h5" sx={{ mb: 4, mt: 4 }}>
                    Consumo diário por categoria
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Chart
                    chartType="PieChart"
                    data={data}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs>
          {/* pratos */}
          <Grid container xs direction="column">
            <Grid item xs sx={{ mt: 8, mb: 4 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h4">
                    Pratos
                  </Typography>
                </Grid>
                <Grid item>
                  <Button onClick={handleClickOpenModal} variant="outlined" color='secondary' startIcon={<AddIcon />}>
                    Adicionar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {[0, 1, 2, 3, 4, 5, 6].map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                    <ListItem
                      key={value}
                      disablePadding
                    >
                      <ListItemButton>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                          <Grid item>
                            <CardMedia
                              component="img"
                              height="84"
                              image="https://www.sabornamesa.com.br/media/k2/items/cache/c910db2cadeb7dd44121f01e6d7b155d_XL.jpg"
                              alt="Paella dish"
                            />
                          </Grid>
                          <Grid item xs>
                            <Grid container justifyContent="center" alignContent="center">
                              <Grid item xs={11}>
                                <Grid container direction="column">
                                  <Grid item>
                                    <Typography variant="button" sx={{ mb: 4, mt: 4 }}>
                                      Strogonoff
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography variant="caption" sx={{ mb: 4, mt: 4 }}>
                                      O strogonoff é um prato irresistível que combina pedaços macios de carne com um molho cremoso e envolvente. Os sabores caramelizados da carne e o aroma dos cogumelos se unem em uma experiência saborosa, complementados pela riqueza do molho à base de creme de leite e mostarda
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={1} style={{ alignSelf: 'center' }}>
                                <Grid container>
                                  <Grid item>
                                    <IconButton color="secondary" aria-label="add an alarm">
                                      <VisibilityIcon />
                                    </IconButton>
                                  </Grid>
                                  <Grid item>
                                    <IconButton onClick={() => handleClickToast(true)} color="secondary" aria-label="add an alarm">
                                      <DeleteForeverIcon />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </main>
  )
}
