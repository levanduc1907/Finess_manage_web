import { Box, IconButton, Stack, Typography } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

import { BigTrashIcon } from '@/utils/resources';

import { AppButton } from '../AppButton/AppButton';
import { useAppLanguage } from '@/utils/modules';

type TAppDeleteDialogProps = {
  open: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onSubmit?: () => void;
  headerLabel?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  width?: number;
  height?: number;
  isLoading?: boolean;
};

export function AppDeleteDialog({
  open,
  headerLabel,
  cancelLabel,
  confirmLabel,
  onSubmit,
  onOpen,
  onClose,
  height,
  isLoading,
}: TAppDeleteDialogProps) {
  const { Strings } = useAppLanguage();
  return (
    <Dialog
      open={open}
      onClose={onOpen}
      sx={{
        minWidth: 100,
      }}
      PaperProps={{
        style: {
          width: 380,
          minHeight: height,
          maxWidth: '100%',
          borderRadius: 8,
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
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <BigTrashIcon />
          <Typography mt={2}>{Strings.confirm_delete}</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Stack direction="row" justifyContent="center" gap={2} width="100%">
          <AppButton
            sx={{
              width: 140,
              color: theme => theme.palette.common.white,
              background: theme => theme.palette.neutral[500],
              '&:hover': {
                background: theme => theme.palette.neutral[500],
              },
            }}
            onClick={onClose}
            variant="contained"
          >
            {cancelLabel ?? Strings.cancel}
          </AppButton>
          <AppButton
            sx={{ width: 140 }}
            type="submit"
            variant="contained"
            color="error"
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
