import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import { hexToRGB, hexToHSL, copyToClipboard } from '../utils/utils'
import { UseSnackbar } from '../ui/useSnackbar';
import { useState } from 'react';
import { useTheme } from '@mui/material';

interface PalletCardProps {
  color: {
    hex: string,
    isLocked: boolean
  },
  id: number,
  handleIconChange: (props: number) => void
}

const PalletCard = (props: PalletCardProps) => {
  const [so, setSo] = useState<boolean>(false);
  const theme = useTheme();
  const color = theme.palette.getContrastText(props.color.hex);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} data-test="color-card">
      <Box sx={{ backgroundColor: props.color.hex, borderRadius: '10px' }}>
        <Grid container>
          <Grid item xs={10}>
            <Box p="10px">
              <Typography variant="h5" textTransform="uppercase" fontWeight="bold" color={color} component={IconButton} disableRipple={true} py={1} px={0} mb={1} onClick={() => { copyToClipboard(props.color.hex); setSo(true); }}>
                {props.color.hex}
              </Typography>

              <Box mb={2}>
                <Typography variant="subtitle1" color={color}>RGB</Typography>
                <Typography 
                  variant="body1" 
                  component={IconButton} 
                  color={color} 
                  disableRipple={true} 
                  p={0} 
                  onClick={() => {copyToClipboard(hexToRGB(props.color.hex)); setSo(true); 
                }}>
                  {hexToRGB(props.color.hex)}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" color={color}>HSL</Typography>
                <Typography variant="body1" component={IconButton} color={color} disableRipple={true} p={0} onClick={() => {copyToClipboard(hexToHSL(props.color.hex)); setSo(true); }}>
                  {hexToHSL(props.color.hex)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={2}>
            <Box sx={{ height: '100%',display: 'flex', flexGrow: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Tooltip title="Lock">
                <IconButton onClick={() => props.handleIconChange(props.id)}>
                  {props.color.isLocked ? <Lock sx={{ color: color }} /> : <LockOpen sx={{ color: color }} />}
                </IconButton>
              </Tooltip>
          </Box>
          </Grid>
        </Grid>
      </Box>
      <UseSnackbar message='Copied' so={so} setSo={setSo} />
    </Grid>
  )
}

export default PalletCard;