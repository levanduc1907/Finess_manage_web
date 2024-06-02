import { useCallback, useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

import { Box, CircularProgress, Typography } from '@mui/material';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useAppLanguage } from '@/utils/modules';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 800;

type TAppPDFViewerProps = {
  url: string;
};

export function AppPDFViewer({ url }: TAppPDFViewerProps) {
  const { Strings } = useAppLanguage();
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [numPages, setNumPages] = useState(0);

  const onResize = useCallback<ResizeObserverCallback>(entries => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useEffect(() => {
    const observe = new ResizeObserver(onResize);

    if (containerRef) {
      observe.observe(containerRef);
    }

    return () => {
      if (containerRef) {
        observe.unobserve(containerRef);
      }
    };
  }, [containerRef, onResize]);

  const handleLoadDocumentSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <Box ref={(ref: HTMLDivElement) => (ref ? setContainerRef(ref) : null)}>
      <Document
        file={url}
        onLoadSuccess={handleLoadDocumentSuccess}
        options={options}
        loading={<CircularProgress size={20} />}
        noData={<Typography>{Strings.cv_not_found}</Typography>}
      >
        <Box mx="auto">
          {Array.from({ length: numPages ?? 0 }, (_, i) => (
            <Page
              loading={<CircularProgress size={20} />}
              key={`page_${i + 1}`}
              pageNumber={i + 1}
              // width={maxWidth}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              }
            />
          ))}
        </Box>
      </Document>
    </Box>
  );
}
