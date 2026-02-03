import PdfViewer from "@/components/PdfViewer";
import { Input } from "@/components/ui/input";
import { useState, type ChangeEvent } from "react";
import { pdfjs } from "react-pdf";
import { toast } from "sonner";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();
const MAX_PDF_SIZE = 10 * 1024 * 1024;
const Home = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPDF =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPDF) {
      e.target.value = "";
      toast.warning("Please select a valid PDF file.");
      return;
    }

    if (file.size > MAX_PDF_SIZE) {
      e.target.value = "";
      toast.warning("Please select pdf of maximum 10 MB");
      return;
    }

    setPdfFile(file);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Upload a PDF, select the pages you need, and generate a new PDF
        </h2>
        <p className="text-muted-foreground">
          Your files are processed securely and removed automatically.
        </p>
      </div>

      {/* Upload section */}
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-card border border-border rounded-lg p-6 shadow-sm space-y-4">
          <label className="block text-sm font-medium">
            Upload a PDF file{" "}
            <span className="text-muted-foreground text-xs">
              Maximum file size: 10 MB
            </span>
          </label>
          <Input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* PDF Viewer */}
      {pdfFile && (
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <PdfViewer pdf={pdfFile} />
        </div>
      )}
    </div>
  );
};

export default Home;
