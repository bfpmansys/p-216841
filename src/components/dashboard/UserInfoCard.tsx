
import { FC, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserInfo {
  first_name: string;
  last_name: string;
}

export const UserInfoCard: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setUserInfo(data);
        }
      }
    };

    getUserProfile();
  }, []);

  if (!userInfo) return null;

  return (
    <div className="bg-[#FFF5F2] p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-1">GOOD DAY!</h2>
      <h3 className="text-xl font-semibold mb-4">{userInfo.first_name} {userInfo.last_name}</h3>
      <div className="space-y-2 text-sm">
        <p>User ID Number: {userId?.slice(0, 8)}</p>
        <p>No. of Establishment: 0</p>
        <p>Last Log in: {new Date().toLocaleDateString()}</p>
      </div>
      <p className="mt-4 text-sm">
        We're thrilled to present our improved Establishment Portal designed with ease.
        Experience a seamless journey as you access your establishment information,
        inspection schedules and compliance updates all at your fingertips.
      </p>
    </div>
  );
};
