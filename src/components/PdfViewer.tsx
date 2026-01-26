import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import PageSelector from "./PageSelector";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { messages } from "@/constants/messages";
import { uploadPDF } from "@/api/pdf";
const options = {
  cMapUrl: "/cmaps/",
};

function PdfViewer({ pdf }: { pdf: File | null }) {
  const [numPages, setNumPages] = useState<number>();
  const [pdfId, setPdfId] = useState(null);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const containerRef = useRef(null);
  const [_, setContainerWidth] = useState(0);

  useEffect(() => {
    const observeTarget = containerRef.current;
    if (!observeTarget) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setContainerWidth(entry.contentRect.width);
      });
    });
    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  if (!pdf) return null;

  const handleUpload = async () => {
    try {
      const res = await uploadPDF(pdf);
      if (res.success && res.pdfId) {
        setPdfId(res.pdfId);
        toast.success(messages.UPLOAD_SUCCESS);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : messages.UNEXPECTED_ERROR,
      );
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      {/* Header */}
      <div className="mb-4 text-center text-sm text-muted-foreground">
        {numPages ? `Total pages: ${numPages}` : "Loading PDF…"}
      </div>

      {/* Scroll container */}
      <div className="max-h-[70vh] overflow-y-auto rounded-lg border border-border bg-background p-4">
        <Document
          file={pdf}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          className="flex flex-col items-center gap-6"
        >
          {Array.from({ length: numPages || 0 }, (_, i) => (
            <div
              key={i}
              className="w-full flex justify-center rounded-md bg-muted p-3"
            >
              <Page
                pageNumber={i + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className="shadow-md"
                width={Math.min(800, window.innerWidth - 64)}
              />
            </div>
          ))}
        </Document>
      </div>

      <div className="flex flex-col justify-center mt-4">
        <Button variant={"default"} onClick={handleUpload}>
          Upload
        </Button>
        {pdfId && (
          <div className="w-full max-w-200 flex justify-center">
            <PageSelector totalPages={numPages} pdfId={pdfId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfViewer;
