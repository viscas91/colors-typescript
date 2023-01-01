import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from "react";

interface Props {
    message: string,
    so: boolean,
    setSo: (prop: boolean) => void
}

export const UseSnackbar = (props: Props) => {
    const [so, setSo] = useState<boolean>(false);

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setSo(false);
    };

    return (
        <Snackbar
            open={props.so}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
        >
            <Alert elevation={6} variant="filled" severity='success'>{props.message}</Alert>
        </Snackbar>
    )
}