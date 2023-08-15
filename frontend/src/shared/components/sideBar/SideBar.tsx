
import { Button, Divider, Grid } from '@mui/material'
import styles from './sideBar.module.css'
import FastfoodIcon from '@mui/icons-material/Fastfood';

export default function SideBar() {
  return (
    <aside className={styles.sideBarContainer}>
      
      <Grid container direction="column" spacing={2}>

        <Grid item xs>
          <Button color="secondary" startIcon={<FastfoodIcon />} variant="outlined" fullWidth>
            Cozinha
          </Button>
        </Grid>

      </Grid>

    </aside>
  )
}
