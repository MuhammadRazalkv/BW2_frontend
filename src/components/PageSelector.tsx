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
  const handleExtraction = async () => {
    try {
      if (selectedPages.length < 1) {
        toast.error(messages.SELECT_ONE_PAGE);
      }
      const res = await extractPDF(pdfId, selectedPages);
      if (res.success) {
        toast.success(messages.EXTRACTION_SUCCESS);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : messages.UNEXPECTED_ERROR,
      );
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-muted-foreground">
        Select the page numbers that you need to extract.
      </p>
      <p className="text-muted-foreground">
        {selectedPages.length
          ? `Selected pages: ${selectedPages.join(", ")}`
          : "No pages selected"}
      </p>

      <RotatingCards
        totalPages={totalPages}
        setSelectedPages={setSelectedPages}
        selectedPages={selectedPages}
      />
      <Button className="w-full" variant={"default"} onClick={handleExtraction}>
        Extract
      </Button>
    </div>
  );
};

export default PageSelector;
