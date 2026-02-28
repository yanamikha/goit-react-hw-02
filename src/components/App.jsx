import { useEffect, useState } from "react";

export default function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let blobUrl;

    const fetchPdf = async () => {
      try {
        const response = await fetch("https://localhost:7142/pdf", {
          credentials: "include"
        });

        if (!response.ok) throw new Error("Failed to fetch PDF");

        const blob = await response.blob();
        blobUrl = URL.createObjectURL(blob);
        setPdfUrl(blobUrl);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  if (loading) return <div>Loading PDF...</div>;
  if (error) return <div style={{ color: "red" }}>Failed to load PDF</div>;

  return (
    <object
      data={pdfUrl}
      type="application/pdf"
      width="100%"
      height="70vh"
      style={{ border: "none" }}
    />
  );
}