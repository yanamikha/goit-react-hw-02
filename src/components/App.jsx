import { useEffect, useState } from "react";

export default function PdfViewer({ filePath = "/test.pdf" }) {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Простая проверка userAgent на Android
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    setIsAndroid(/android/i.test(ua));
  }, []);

  const pdfUrl = `${window.location.origin}${filePath}`;

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      {isAndroid ? (
        <iframe
          src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="PDF Viewer"
        />
      ) : (
        <object
          data={pdfUrl}
          type="application/pdf"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        >
          <p>
            PDF preview not available.{" "}
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Open PDF
            </a>
          </p>
        </object>
      )}
    </div>
  );
}