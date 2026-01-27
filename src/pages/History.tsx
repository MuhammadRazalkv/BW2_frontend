import { getPDF, listPDF } from "@/api/pdf";
import { messages } from "@/constants/messages";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingState from "@/components/LoadingState";
import { formatTimeAgo } from "@/utils/time";
import PdfViewer from "@/components/PdfViewer";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
type PdfList = {
  pdfId: string;
  originalName: string;
  pageCount: number;
  uploadedAt: number;
  expiresAt: number;
  size: number;
};
const History = () => {
  const [list, setList] = useState<PdfList[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [pdf, setPdfFile] = useState<File | null>(null);
  const [pdfId, setPdfId] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await listPDF();
        if (res.success) {
          setList(res.list);
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : messages.UNEXPECTED_ERROR,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      setPdfFile(null);
    };
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingState />
      </div>
    );
  }

  const handleClick = async (pdfId: string) => {
    try {
      const pdfBlob = await getPDF(pdfId);
      const file = new File([pdfBlob], "preview.pdf", {
        type: "application/pdf",
      });

      setPdfFile(file);
      setPdfId(pdfId);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : messages.UNEXPECTED_ERROR,
      );
    }
  };
  const handleGoBack = () => {
    setPdfFile(null);
    setPdfId(null);
  };
  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <div className="flex justify-center">
        {pdfId && pdf ? (
          <div className="flex flex-col gap-2">
            <Button variant={"outline"} onClick={handleGoBack}>
              <ChevronLeft className="h-4 w-4" />
              <p className="text-muted-foreground text-sm">Go back</p>
            </Button>
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <PdfViewer pdf={pdf} hostedPdfId={pdfId} />
            </div>
          </div>
        ) : list && list.length > 0 ? (
          <Table>
            <TableCaption>A list of your recent PDF uploads.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Page count</TableHead>
                <TableHead>Uploaded at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item, i) => (
                <TableRow
                  key={item.pdfId}
                  onClick={() => handleClick(item.pdfId)}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{item.originalName}</TableCell>
                  <TableCell>{item.pageCount}</TableCell>
                  <TableCell>{formatTimeAgo(item.uploadedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground text-md">No uploads found</p>
        )}
      </div>
    </div>
  );
};

export default History;
