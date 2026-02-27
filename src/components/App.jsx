import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    let url;

    fetch("/test.pdf")
      .then((res) => res.blob())
      .then((blob) => {
        url = URL.createObjectURL(blob);
        setPdfUrl(url);
      });

    return () => {
      if (url) URL.revokeObjectURL(url); // теперь корректно освобождаем память
    };
  }, []);

  return (
    <div>
      {pdfUrl && (
        <>
          <embed
            src={pdfUrl}
            type="application/pdf"
            className="h-[70vh] w-full rounded-b-lg"
          />
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={index} pageNumber={index + 1} />
            ))}
          </Document>
        </>
      )}
    </div>
  );
}