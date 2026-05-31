import axios from "axios";

export async function uploadDataset(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const serverBaseUrl =
    process.env.NEXT_PUBLIC_SERVER_BASE_URL;

  const response = await axios.post(
    `${serverBaseUrl}/upload`,
    formData,
    {
      responseType: "blob",

      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
}