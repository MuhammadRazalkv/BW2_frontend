import axios from "axios";
import axiosInstance from "./axios";
import { messages } from "@/constants/messages";

export async function uploadPDF(pdf: File) {
  try {
    const formData = new FormData();
    formData.append("pdf", pdf);

    const response = await axiosInstance.post("/upload", formData);
    return response.data;
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error(messages.NETWORK_ISSUE);
    }
  }
}
export async function extractPDF(pdfId: string, pages: number[]) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/pdf/extract?pdfId=${pdfId}&pages=${pages.toString()}`,
      {
        responseType: "blob",
        withCredentials: true,
      },
    );
    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "extracted.pdf";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

    return response.data;
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error(messages.NETWORK_ISSUE);
    }
  }
}
