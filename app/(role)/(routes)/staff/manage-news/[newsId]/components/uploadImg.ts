const cloudName: string | undefined = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset: string | undefined = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    uploadPreset || "" 
  );
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${
      cloudName || "" 
    }/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  const url = data.url;

  return url;
};

export default uploadToCloudinary;
