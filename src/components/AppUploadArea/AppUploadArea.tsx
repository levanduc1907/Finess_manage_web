import Dropzone from 'react-dropzone';

import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import FileUploadIcon from '@mui/icons-material/FileUpload';

import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { ToastService, useAppLanguage } from '@/utils/modules';
import { useUploadFile } from './modules/useUploadFile';
import { toast } from 'react-toastify';
import { AppLoadingOverlay } from '..';
import { useState } from 'react';

type TAppUploadAreaProps<T> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> & {
  type: 'video' | 'image';
  label?: string;
  placeholder?: string;
  kindPlaceholder?: string;
  required?: boolean;
};

const MAX_SIZE_UPLOAD_IMAGE = 5 * 1024 * 1024;
const MAX_SIZE_UPLOAD_VIDEO = 25 * 1024 * 1024;

export function AppUploadArea<T>({
  control,
  name,
  type,
  label,
  defaultValue,
  rules,
  required = false,
}: TAppUploadAreaProps<T>) {
  const { Strings } = useAppLanguage();
  const { status: uploadStatus, upload: uploadFile } = useUploadFile();
  const [filePreview, setFilePreview] = useState<File>();

  const fileAcceptable = {
    ...(type === 'image'
      ? {
          'image/jpeg': ['.jpeg', '.jpg'],
          'image/png': ['.png'],
        }
      : {}),
    ...(type === 'video' ? { 'video/mp4': ['.mp4'] } : {}),
  };

  const renderDraggingState = () => {
    return (
      <Typography
        component="span"
        sx={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: '14px',
          color: theme => theme.palette.primary.main,
        }}
      >
        {Strings.drop_file_here}
      </Typography>
    );
  };

  const renderNormalState = () => {
    return (
      <Typography
        sx={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: 'bold',
            color: theme => theme.palette.primary.main,
            fontSize: '14px',
          }}
        >
          {Strings.click_to_upload}
        </Typography>{' '}
        {Strings.or_drag_and_drop}
      </Typography>
    );
  };

  const renderContainer = (isDragActive: boolean, remoteURI: string) => {
    const placeholder = (
      <>
        <IconButton
          sx={{
            borderRadius: '100%',
            background: theme => theme.palette.neutral[100],
            p: 1,
            mb: 2,
          }}
        >
          <FileUploadIcon />
        </IconButton>
        {isDragActive ? renderDraggingState() : renderNormalState()}
        <Typography
          sx={{
            fontSize: '12px',
            color: theme => theme.palette.text.secondary,
          }}
        >
          {type === 'image'
            ? Strings.upload_size_limit_image
            : Strings.upload_size_limit_video}
        </Typography>
      </>
    );
    let component;
    let previewSource;

    if (filePreview) {
      previewSource = URL.createObjectURL(filePreview);
    }

    if (type === 'image') {
      component = (
        <img src={remoteURI || previewSource} style={{ width: '100%' }} />
      );
    } else {
      component = (
        <video
          src={remoteURI || previewSource}
          style={{ width: '100%' }}
          controls
        />
      );
    }

    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ pointerEvents: uploadStatus === 'pending' ? 'none' : 'auto' }}
      >
        {remoteURI || previewSource ? component : placeholder}
      </Stack>
    );
  };

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl sx={{ width: '100%' }} required={required}>
            <FormLabel
              sx={{
                color: theme => theme.palette.text.primary,
              }}
            >
              {label}
            </FormLabel>
            <Dropzone
              onDrop={async (files: File[]) => {
                const file = files?.[0] as File;
                const fileSize = file.size;

                if (type === 'video' && fileSize > MAX_SIZE_UPLOAD_VIDEO) {
                  toast.error("File size can't exceed 25MB");
                  return;
                }

                if (type === 'image' && fileSize > MAX_SIZE_UPLOAD_IMAGE) {
                  toast.error("File size can't exceed 5MB");
                  return;
                }

                if (file) {
                  try {
                    setFilePreview(file);
                    const response = await uploadFile(file);
                    const url = response?.data[0].url;
                    console.log(url);
                    field.onChange(url);
                    setFilePreview(undefined);
                  } catch (error) {
                    ToastService.error(Strings.something_went_wrong);
                  }
                }
              }}
              accept={fileAcceptable}
              maxSize={
                type === 'image' ? MAX_SIZE_UPLOAD_IMAGE : MAX_SIZE_UPLOAD_VIDEO
              }
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    border: theme =>
                      isDragActive
                        ? `2px solid ${theme.palette.info.main}`
                        : `1px dashed ${error ? theme.palette.error.main : theme.palette.neutral[300]}`,
                    cursor: 'pointer',
                    aspectRatio: '1/1',
                    width: '100%',
                    height: '220px',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: isDragActive ? '#06AED422' : null,
                    alignItems: 'center',
                    overflow: 'hidden',
                    textAlign: 'center',
                  }}
                  mt={1}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Stack
                    direction="column"
                    gap={1}
                    mt={2}
                    justifyContent={'center'}
                    alignItems="center"
                  >
                    <AppLoadingOverlay isLoading={uploadStatus === 'pending'}>
                      {renderContainer(isDragActive, field.value)}
                    </AppLoadingOverlay>
                  </Stack>
                </Box>
              )}
            </Dropzone>
            {!!error && (
              <FormHelperText
                sx={{
                  color: theme => theme.palette.error.main,
                }}
              >
                {error?.message}
              </FormHelperText>
            )}
            {/* {!!field.value && (
              <FormHelperText
                sx={{
                  color: theme => theme.palette.primary.main,
                  textDecoration: 'underline',
                }}
              >
                {field.value}
              </FormHelperText>
            )} */}
          </FormControl>
        );
      }}
    />
  );
}
