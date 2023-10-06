import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

export default function AlertVariousStates({title, color, icon}) {
  const items = [
    { d: 'Success', ds: 'success', s: <CheckCircleIcon /> },
    { d: 'Warning', ds: 'warning', s: <WarningIcon /> },
    { d: 'Error', ds: 'danger', s: <ReportIcon /> },
    { d: 'Neutral', ds: 'neutral', s: <InfoIcon /> },
  ];

  return (
    <div style={{position: 'relative'}}>
    <Box sx={{ display: 'flex', gap: 2, width: '20%', flexDirection: 'column' }}>
        <Alert
          key={title}
          sx={{ alignItems: 'flex-start' }}
          startDecorator={icon}
          variant="soft"
          color={color}
          endDecorator={
            <IconButton variant="soft" color={color}>
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <div>{title}</div>
            <Typography level="body-sm" color={color}>
              This is a time-sensitive {title} Alert.
            </Typography>
          </div>
        </Alert>
    </Box>
    </div>
  );
}
