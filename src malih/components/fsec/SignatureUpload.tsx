import React, { useRef, useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface SignatureUploadProps {
  onFileSelected: (file: File) => void;
}

export const SignatureUpload: React.FC<SignatureUploadProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    // Retrieve saved signature from local storage
    const storedSignature = localStorage.getItem("savedSignature");
    const storedFileName = localStorage.getItem("savedSignatureName");

    if (storedSignature && storedFileName) {
      setPreview(storedSignature);
      setFileName(storedFileName);
    }
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadedFile(file);
      onFileSelected(file);

      // Convert to Base64 and store in local storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        localStorage.setItem("savedSignature", base64String);
        localStorage.setItem("savedSignatureName", file.name);
      };
      reader.readAsDataURL(file);

      // Clear input value to allow re-uploading the same file
      e.target.value = '';
    }
  };

  const handleView = () => {
    if (preview) {
      const newTab = window.open();
      newTab?.document.write(`<img src="${preview}" style="width:100%">`);
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
