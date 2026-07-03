import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import UserInfoCard from "../components/profile/UserInfoCard";
import AccountCard from "../components/profile/AccountCard";
import SecurityCard from "../components/profile/SecurityCard";
import LogoutModal from "../components/profile/LogoutModal";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  function handlelogout() {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  }
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1480px] space-y-7 p-4 pb-10 sm:p-6 xl:p-8">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">My Profile </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your account information and security settings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <UserInfoCard user={user} />
          <SecurityCard
            onchangePassword={() => setShowChangePasswordModal(true)}
          />
        </div>

        <AccountCard onLogout={() => setShowLogoutModal(true)} />
      </div>
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handlelogout}
      />
      <ChangePasswordModal
        open={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </DashboardLayout>
  );
}
