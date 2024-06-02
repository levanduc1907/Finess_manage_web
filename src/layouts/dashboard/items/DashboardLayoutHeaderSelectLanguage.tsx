import { MenuItem, MenuList, Popover } from '@mui/material';

import { useAppLanguage } from '@/utils/modules';

type TDashboardLayoutHeaderSelectLanguageProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  open: boolean;
};

export function DashboardLayoutHeaderSelectLanguage({
  anchorEl,
  onClose,
  open,
}: TDashboardLayoutHeaderSelectLanguageProps) {
  const { Strings, setLanguageCode } = useAppLanguage();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setLanguageCode('vi');
            onClose();
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <img
            alt="logo"
            src="/assets/icons/vi.png"
            style={{
              width: '16px',
              height: 'auto',
              display: 'inline-block',
            }}
          />
          {Strings.vietnamese}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setLanguageCode('en');
            onClose();
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <img
            alt="logo"
            src="/assets/icons/en.png"
            style={{
              width: '16px',
              height: 'auto',
              display: 'inline-block',
            }}
          />
          {'English'}
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
