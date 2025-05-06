import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        <RiLogoutBoxLine
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      )}
    </div>
  );
};

export default LogoutButton;
