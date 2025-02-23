
import React, { useRef, useState } from 'react';
import { Eye } from 'lucide-react';

interface SignatureUploadProps {
  onFileSelected: (file: File) => void;
}

export const SignatureUpload: React.FC<SignatureUploadProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadedFile(file);
      onFileSelected(file);

      // Create preview URL for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
      
      // Clear the input value to allow uploading the same file again if needed
      e.target.value = '';
    }
  };

  const handleView = () => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center mx-0 my-5">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleClick}
          className="w-[57px] h-[56px] bg-[#FE623F] rounded-full flex flex-col items-center justify-center text-white relative overflow-hidden"
        >
          {preview ? (
            <img 
              src={preview} 
              alt="Signature preview" 
              className="w-full h-full object-cover absolute inset-0"
            />
          ) : (
            <>
              <span className="text-2xl">↑</span>
              <span className="text-[10px] font-semibold">Upload</span>
            </>
          )}
        </button>
        <div className="text-base ml-4">
          Upload Signature over Printed Name
        </div>
      </div>
      {fileName && (
        <div className="flex items-center justify-between text-sm text-gray-600 ml-4">
          <span>Uploaded file: {fileName}</span>
          <button
            onClick={handleView}
            className="flex items-center text-[#FE623F] hover:text-[#ff4721] ml-4"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </button>
        </div>
      )}
    </div>
  );
};