import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { messages } from "@/constants/messages";
import { extractPDF, uploadPDF } from "@/api/pdf";

const options = {
  cMapUrl: "/cmaps/",
};

function PdfViewer({
  pdf,
  hostedPdfId,
}: {
  pdf: File | null;
  hostedPdfId?: string;
}) {
  const [numPages, setNumPages] = useState<number>();
  const [pdfId, setPdfId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const newWidth = Math.floor(entries[0].contentRect.width);

      setContainerWidth((prev) => {
        // Increase threshold to prevent resize loops
        if (Math.abs(newWidth - prev) > 16) {
          return newWidth;
        }
        return prev;
      });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPdfId(null);
    setLoading(false);
  }, [pdf]);

  useEffect(() => {
    if (hostedPdfId && !pdfId) {
      setPdfId(hostedPdfId);
    }
  }, [hostedPdfId, pdfId]);

  const columns = useMemo(() => {
    if (containerWidth >= 1024) return 4;
    if (containerWidth >= 768) return 3;
    return 1;
  }, [containerWidth]);

  const pageWidth = useMemo(() => {
    if (!containerWidth) return 200;
    // gap-4 = 16px, padding on container = 16px (p-4)
    const gap = 16;
    const padding = 32; // left + right
    const availableWidth = containerWidth - padding - (columns - 1) * gap;
    return Math.floor(availableWidth / columns);
  }, [containerWidth, columns]);

  if (!pdf) return null;

  const handleUpload = async () => {
    try {
      setLoading(true);
      const res = await uploadPDF(pdf);
      if (res.success && res.pdfId) {
        setPdfId(res.pdfId);
        toast.success(messages.UPLOAD_SUCCESS);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : messages.UNEXPECTED_ERROR,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExtraction = async () => {
    try {
      if (selectedPages.size < 1) {
        toast.error(messages.SELECT_ONE_PAGE);
        return;
      }
      if (!pdfId) {
        toast.error(messages.PLEASE_SELECT_A_FILE);
        return;
      }
      setLoading(true);
      const res = await extractPDF(pdfId, [...selectedPages]);
      if (res.success) {
        toast.success(messages.EXTRACTION_SUCCESS);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : messages.UNEXPECTED_ERROR,
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePage = (pageNum: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);

      if (next.has(pageNum)) {
        next.delete(pageNum);
      } else {
        next.add(pageNum);
      }

      return next;
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 text-center text-sm text-muted-foreground">
        {numPages ? `Total pages: ${numPages}` : "Loading PDF…"}
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="max-h-[70vh] overflow-y-auto rounded-lg border border-border bg-background p-4"
      >
        {containerWidth > 0 && (
          <Document
            file={pdf}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Array.from({ length: numPages || 0 }, (_, i) => {
                const pageNum = i + 1;
                const checked = selectedPages.has(pageNum);

                return (
                  <div
                    key={pageNum}
                    className={`relative rounded-md border bg-muted p-2 shadow-sm cursor-pointer ${
                      checked ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => pdfId && togglePage(pageNum)}
                  >
                    {pdfId && (
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePage(pageNum)}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2 left-2 z-10 h-5 w-5 cursor-pointer rounded-md bg-white/90 backdrop-blur border border-black/20 shadow-lg accent-primary hover:bg-white  transition-all"
                      />
                    )}

                    <Page
                      pageNumber={pageNum}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      width={pageWidth}
                      className="rounded shadow"
                    />
                  </div>
                );
              })}
            </div>
          </Document>
        )}
      </div>

      <div className="flex flex-col justify-center mt-4">
        {!pdfId ? (
          <Button disabled={loading} variant={"default"} onClick={handleUpload}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        ) : (
          <Button
            onClick={handleExtraction}
            disabled={!selectedPages.size || loading}
          >
            {loading ? "Extracting..." : "Extract PDF"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default PdfViewer;
