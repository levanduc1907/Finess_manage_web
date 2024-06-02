import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { FormControl, FormControlProps, FormLabel } from '@mui/material';

type TAppTextEditorProps<T> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> & {
  height?: number | string;
  minHeight?: number | string;
  required?: boolean;
  label?: string;
  readOnly?: boolean;
} & Partial<FormControlProps>;

export function AppTextEditor<T>({
  name,
  control,
  defaultValue,
  disabled,
  rules,
  height,
  minHeight,
  required,
  label,
  readOnly,
  ...props
}: TAppTextEditorProps<T>) {
  const modules = {
    toolbar: [
      // [{ header: '1' }, { header: '2' }, 'code-block'],
      // [{ size: [] }],
      // [{ script: 'super' }, { script: 'sub' }],
      // [{ color: [] }, { background: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        'direction',
        { align: [] },
        { list: 'ordered' },
        { list: 'bullet' },

        // { indent: '-1' }, { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block',
    'align',
    'direction',
    'color',
    'background',
    'script',
    'super',
    'sub',
  ];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      rules={rules}
      render={({ field, formState: { errors } }) => {
        return (
          <FormControl
            {...props}
            sx={{
              width: '100%',
              position: 'relative',
              '& .ql-toolbar': {
                borderColor: theme =>
                  errors[name] ? theme.palette.error.main : 'auto',
              },
              '& .ql-container': {
                borderColor: theme =>
                  errors[name] ? theme.palette.error.main : 'auto',
              },
              ...props.sx,
            }}
          >
            <FormLabel
              required={required}
              sx={{
                mb: 1,
                position: 'absolute',
                fontSize: 12,
                background: theme => theme.palette.common.white,
                padding: '0 6px',
                top: -8,
                left: 8,
                color: theme =>
                  errors[name]
                    ? theme.palette.error.main
                    : theme.palette.neutral[500],
                fontWeight: 500,
              }}
            >
              {label}
            </FormLabel>
            <ReactQuill
              style={{
                height: height ?? '300px',
                minHeight: minHeight ?? '300px',
              }}
              theme={'snow'}
              modules={modules}
              formats={formats}
              readOnly={readOnly}
              {...field}
              onChange={value => {
                field.onChange(value);
              }}
            />
          </FormControl>
        );
      }}
    />
  );
}
