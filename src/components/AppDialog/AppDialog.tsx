import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { AppButton } from '../AppButton/AppButton';
import { useAppLanguage } from '@/utils/modules';

type TAppDialogProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  headerLabel: string;
  cancelLabel?: string;
  confirmLabel?: string;
  width?: number;
  height?: number;
  isLoading?: boolean;
};

export function AppDialog({
  open,
  children,
  headerLabel,
  cancelLabel,
  confirmLabel,
  onSubmit,
  onOpen,
  onClose,
  width,
  height,
  isLoading,
}: TAppDialogProps) {
  const { Strings } = useAppLanguage();
  return (
    <Dialog
      open={open}
      onClose={onOpen}
      sx={{
        minWidth: 300,
      }}
      PaperProps={{
        style: {
          width: width,
          minHeight: height,
          maxWidth: '100%',
        },
      }}
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="primary.main" fontWeight="bold" fontSize={24}>
            {headerLabel}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 3 }}>{children}</Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="center" gap={2} width="100%">
          <AppButton sx={{ width: 230 }} onClick={onClose} variant="outlined">
            {cancelLabel ?? Strings.cancel}
          </AppButton>
          <AppButton
            sx={{ width: 230 }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
            loading={isLoading}
          >
            {confirmLabel ?? Strings.confirm}
          </AppButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
