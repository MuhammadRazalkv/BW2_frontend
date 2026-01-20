import { useState } from "react";
import RotatingCards from "./RotatingCards";

const PageSelector = ({ totalPages }: { totalPages?: number }) => {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
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
    </div>
  );
};

export default PageSelector;
