import { useState } from "react";
import RotatingCards from "./RotatingCards";
import { toast } from "sonner";
import { messages } from "@/constants/messages";
import { extractPDF } from "@/api/pdf";
import { Button } from "./ui/button";

const PageSelector = ({
  totalPages,
  pdfId,
}: {
  totalPages?: number;
  pdfId: string;
}) => {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const handleExtraction = async () => {
    try {
      if (selectedPages.length < 1) {
        toast.error(messages.SELECT_ONE_PAGE);
        return;
      }
      setLoading(true);
      const res = await extractPDF(pdfId, selectedPages);
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
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-5 rounded-xl border border-border bg-background p-6 shadow-sm">
      {/* Instructions */}
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          Select the page numbers you want to extract
        </p>
        <p className="text-xs text-muted-foreground">
          Pages will be extracted in the order you select them
        </p>
      </div>

      {/* Selected pages */}
      <div className="rounded-md bg-muted px-3 py-2 text-sm text-center">
        {selectedPages.length ? (
          <span>
            Selected pages:
            <span className="ml-1 font-medium text-foreground">
              {selectedPages.join(", ")}
            </span>
          </span>
        ) : (
          <span className="text-muted-foreground">No pages selected</span>
        )}
      </div>

      {/* Carousel */}
      <div className="flex justify-center">
        <RotatingCards
          totalPages={totalPages}
          setSelectedPages={setSelectedPages}
          selectedPages={selectedPages}
        />
      </div>

      {/* CTA */}
      <Button
        className="mt-2 w-full disabled:cursor-not-allowed"
        size="lg"
        onClick={handleExtraction}
        disabled={!selectedPages.length || loading}
      >
        Extract PDF
      </Button>
    </div>
  );
};

export default PageSelector;
