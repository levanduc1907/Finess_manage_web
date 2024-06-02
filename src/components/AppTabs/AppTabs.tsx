import React from 'react';
import { Tab, Tabs, TabsProps } from '@mui/material';

type TAppTabsProps = TabsProps & {
  children: React.ReactNode;
  activeTab: number | string;
  labels: string[];
  renderTabLabel?: (label: string) => React.ReactNode;
  onChange?: (_: React.SyntheticEvent, newValue: number) => void;
  minWidthTab?: number;
};

export function AppTabs({
  children,
  activeTab,
  labels,
  minWidthTab,
  renderTabLabel,
  onChange,
  ...props
}: TAppTabsProps) {
  return (
    <>
      <Tabs
        value={activeTab}
        onChange={onChange}
        {...props}
        sx={{
          height: 40,
          minHeight: 'auto',
          borderBottom: theme => `1px solid ${theme.palette.neutral[400]}`,
          overflow: 'visible',
          ...props.sx
        }}
      >
        {labels.map(label => (
          <Tab
            sx={{
              position: 'relative',
              background: theme => theme.palette.grey[100],
              minHeight: 'auto',
              minWidth: minWidthTab ?? 120,
              // minWidth: 'min-content',
              height: 35,
              padding: 0,
              '& a': {
                color: theme => theme.palette.text.primary,
              },
              borderTopLeftRadius: theme => theme.shape.borderRadius * 2,
              borderTopRightRadius: theme => theme.shape.borderRadius * 2,
              '&:not(:first-of-type)': {
                marginLeft: '8px',
              },
              '&.Mui-selected': {
                background: theme => theme.palette.primary.main,
                '& a': {
                  color: theme => theme.palette.common.white,
                  fontWeight: 'bold',
                },
              },
            }}
            key={label}
            label={renderTabLabel?.(label) ?? label}
          />
        ))}
      </Tabs>
      {children}
    </>
  );
}
