import { useState } from "react";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { Camera } from "lucide-react";

interface ImageUploaderProps {
  onImageUploaded?: (imageUrl: string) => void;
}

const ImageUploader = ({ onImageUploaded = () => {} }: ImageUploaderProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        setImage(imageUrl);
        onImageUploaded(imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <label
        htmlFor="file-upload"
        className="relative w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center cursor-pointer group-hover:border-[#ff914d]/50 transition-all overflow-hidden"
      >
        {image ? (
          <img
            src={image}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <Camera className="w-10 h-10 text-gray-400 group-hover:text-[#ff914d]/50" />
        )}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {loading && <p className="mt-2 text-gray-500">Uploading...</p>}
    </div>
  );
};

export default ImageUploader;
