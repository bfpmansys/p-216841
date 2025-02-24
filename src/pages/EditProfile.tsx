
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProfileData {
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  gender: string;
  contactNumber: string;
  avatarUrl: string;
}

const EditProfile: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthday: "",
    gender: "",
    contactNumber: "",
    avatarUrl: "",
  });
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }

        setProfileData(prev => ({ ...prev, email: user.email || "" }));

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setProfileData(prev => ({
            ...prev,
            firstName: profile.first_name,
            middleName: profile.middle_name || "",
            lastName: profile.last_name,
            birthday: profile.birthday,
            gender: profile.gender || "",
            contactNumber: profile.contact_number || "",
            avatarUrl: profile.avatar_url || "",
          }));
        }
      } catch (error: any) {
        toast({
          title: "Error loading profile",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    loadProfile();
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Update profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.firstName,
          middle_name: profileData.middleName || null,
          last_name: profileData.lastName,
          birthday: profileData.birthday,
          gender: profileData.gender || null,
          contact_number: profileData.contactNumber || null,
          avatar_url: profileData.avatarUrl || null,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update email if changed
      if (profileData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: profileData.email,
        });

        if (emailError) throw emailError;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword) return;
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password has been updated successfully.",
      });
      setIsPasswordDialogOpen(false);
      setNewPassword("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <DashboardNavbar />
      
      <div className="bg-[#FF6347] px-6 py-4">
        <h1 className="text-white text-xl font-semibold">EDIT PROFILE</h1>
      </div>

      <main className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name (Optional)</Label>
              <Input
                id="middleName"
                value={profileData.middleName}
                onChange={(e) => setProfileData(prev => ({ ...prev, middleName: e.target.value }))}
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={profileData.gender}
                onValueChange={(value) => setProfileData(prev => ({ ...prev, gender: value }))}
              >
                <SelectTrigger className="bg-gray-100">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={profileData.contactNumber}
                onChange={(e) => setProfileData(prev => ({ ...prev, contactNumber: e.target.value }))}
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday</Label>
              <Input
                id="birthday"
                type="date"
                value={profileData.birthday}
                onChange={(e) => setProfileData(prev => ({ ...prev, birthday: e.target.value }))}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPasswordDialogOpen(true)}
                disabled={isLoading}
              >
                Change Password
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#FF6347] text-white hover:bg-[#FF6347]/90"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your new password below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setIsPasswordDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePasswordChange}
                disabled={isLoading || !newPassword}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfile;
