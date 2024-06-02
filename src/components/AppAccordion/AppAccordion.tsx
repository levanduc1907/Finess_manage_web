import React, { ReactNode } from 'react';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionProps,
  Box,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type TAppAccordionProps = AccordionProps &
  React.PropsWithChildren<{
    label: ReactNode;
  }>;

export function AppAccordion({
  label,
  children,
  ...props
}: TAppAccordionProps) {
  return (
    <Box
      sx={{
        borderRadius: theme => theme.shape.borderRadius / 2,
        '&:not(:last-child)': {
          marginBottom: theme => theme.spacing(2),
        },
      }}
    >
      <Accordion
        {...props}
        sx={{
          '&.MuiAccordion-root': {
            borderRadius: theme => theme.shape.borderRadius,
          },
          border: theme => `1px solid ${theme.palette.grey[400]}`,
        }}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: theme => theme.palette?.neutral?.[100],
            // borderRadius: theme => theme.shape.borderRadius / 2,
            fontWeight: 'bold',
            fontSize: '18px',
            minHeight: 48,
            height: 48,
            // borderTopLeftRadius: 'inherit',
            // borderTopRightRadius: 'inherit',
            borderRadius: 'inherit',
            '&.Mui-expanded': {
              minHeight: 48,
              height: 48,
              margin: 0,
            },
            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
          }}
        >
          {label}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: 2,
          }}
        >
          <Box sx={{ py: 1 }}>{children}</Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
