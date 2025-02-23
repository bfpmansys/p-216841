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
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", user.id)
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
    <div className="text-left max-md:text-left">
      <h3 className="text-2xl font-bold mb-5 max-sm:text-xl">
        {`${userInfo.last_name.toUpperCase()}, ${userInfo.first_name.toUpperCase()}`}
      </h3>


      <div className="text-xl leading-[1.8] max-sm:text-base">
        <p className="font-bold">
          <strong className="font-normal">User ID Number :</strong> {userId?.slice(0, 8)}
        </p>
        <p className="font-bold">
          <strong className="font-normal">No. of Establishment :</strong> 0
        </p>
        <p className="font-bold">
          <strong className="font-normal">Last Login :</strong>{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
    
  );
};
