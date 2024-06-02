import { useRef, useState } from 'react';

export function usePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return {
    anchorRef,
    handleClose,
    handleOpen,
    handleToggle,
    open
  };
}
