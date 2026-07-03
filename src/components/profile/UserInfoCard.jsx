import { User, Mail, Calendar } from "lucide-react";
import { Card } from "../ui";

export default function UserInfoCard({ user }) {
  return (
    <Card className="border-white/80 p-6 shadow-premium dark:border-slate-700">
      <h2 className="mb-6 text-lg font-bold dark:text-white">
        Personal Information
      </h2>

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <User className="text-indigo-500" size={20} />
          <div>
            <p className="text-xs text-slate-500">Full Name</p>
            <p className="font-semibold dark:text-white">{user?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-indigo-500" size={20} />
          <div>
            <p className="text-xs text-slate-500">Email</p>
            <p className="font-semibold dark:text-white">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Calendar className="text-indigo-500" size={20} />
          <div>
            <p className="text-xs text-slate-500">Member Since</p>
            <p className="font-semibold dark:text-white">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}