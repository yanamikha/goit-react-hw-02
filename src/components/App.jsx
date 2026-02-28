import { useEffect, useState } from "react";

export default function PdfViewer({ filePath = "/test.pdf" }) {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    setIsAndroid(/android/i.test(ua));
  }, []);

  const pdfUrl = `${window.location.origin}${filePath}`;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
      {/* Верхняя панель */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ccc",
        }}
      >
        <button style={{ padding: "6px 12px", cursor: "pointer" }}>Back</button>
        <div style={{ textAlign: "center", flex: 1 }}>
          <span style={{ marginRight: "20px", fontWeight: "bold" }}>PT_LB</span>
          <span>Type: Final</span>
        </div>
        <div style={{ width: "60px" }} />
      </div>

      {/* PDF Viewer */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {isAndroid ? (
          <iframe
            src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="PDF Viewer"
          />
        ) : (
          <object
            data={pdfUrl}
            type="application/pdf"
            style={{ width: "100%", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <p style={{ marginBottom: "16px" }}>PDF preview not available.</p>
              <button
                onClick={() => window.open(pdfUrl, "_blank")}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Open PDF
              </button>
            </div>
          </object>
        )}
      </div>

      {/* Нижняя панель */}
      <div
        style={{
          padding: "10px 20px",
          borderTop: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
          textAlign: "center",
        }}
      >
        <button
          onClick={() => window.open(pdfUrl, "_blank")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Open PDF
        </button>
      </div>
    </div>
  );
}