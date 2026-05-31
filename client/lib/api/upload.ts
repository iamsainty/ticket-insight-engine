import axios from "axios";

export async function uploadDataset(file: File) {
  try {
    const formData = new FormData();

    formData.append("file", file);

    const serverBaseUrl =
      process.env.NEXT_PUBLIC_SERVER_BASE_URL;

    const response = await axios.post(
      `${serverBaseUrl}/upload`,
      formData,
      {
        responseType: "blob",

        // prevents axios from throwing on 4xx/5xx
        validateStatus: () => true,

        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Upload API Error:", error);
    throw error;
  }
}