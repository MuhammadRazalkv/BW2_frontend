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
    const response = await axiosInstance.get(
      `/extract?pdfId=${pdfId}&pages=${pages}`,
    );
    return response.data;
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error(messages.NETWORK_ISSUE);
    }
  }
}
