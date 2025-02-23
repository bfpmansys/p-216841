
import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, UploadCloud, FileText, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  file: File;
}

const RequirementsUpload: FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const savedFormData = localStorage.getItem('applicationFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        file
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "Files added",
        description: `Successfully added ${files.length} file(s)`,
      });
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    toast({
      title: "File removed",
      description: "The file has been removed from the list",
    });
  };

  const handleProceed = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one requirement file",
        variant: "destructive"
      });
      return;
    }
    
    // Store uploaded files in localStorage temporarily
    localStorage.setItem('applicationFiles', JSON.stringify(uploadedFiles.map(f => ({
      id: f.id,
      name: f.name,
      type: f.type
    }))));
    
    navigate(`/dashboard/apply/${type}/summary`);
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <div className="bg-[#FF6347] px-6 py-4">
        <button
          onClick={() => navigate(`/dashboard/apply/${type}`)}
          className="text-white flex items-center gap-2 mb-2"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-white text-xl font-semibold">UPLOAD REQUIREMENTS</h1>
      </div>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-1 mb-6">
            <h2 className="font-semibold text-lg">APPLICATION REQUIREMENTS</h2>
            <div className="flex gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-6 h-6 rounded-full  bg-[#FF6347] text-white flex items-center justify-center">1</div>
                <span>Fill out the Form</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FF6347] text-white flex items-center justify-center">2</div>
                <span>Upload the Requirements</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">3</div>
                <span>Confirm and Submit</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <UploadCloud size={48} className="text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Upload your requirements in PDF or image format (PNG, JPG)
                </p>
                <Label
                  htmlFor="file-upload"
                  className="bg-[#FF6347] text-white px-6 py-2 rounded-lg hover:bg-[#FF6347]/90 transition-colors cursor-pointer"
                >
                  Choose Files
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept=".pdf,image/*"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Uploaded Files</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-gray-400" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.type}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleProceed}
                className="bg-[#FF6347] text-white px-6 py-2 rounded-lg hover:bg-[#FF6347]/90 transition-colors"
              >
                PROCEED
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsUpload;
