import React from "react";

const UserProfile = ({ email, code }) => (
  <div className="flex items-center justify-center w-full md:w-[calc(50%-0.75rem)] bg-slate-900 rounded-3xl p-4">
    <div className="flex items-center justify-center flex-row gap-5 md:flex-col bg-slate-950 rounded-3xl p-6 md:px-16 md:py-8">
      <img src="/assets/images/profile.png" alt="Profile" />
      <div className="flex flex-col justify-start md:items-center">
        <p className="font-['Inter'] text-xl font-bold py-4">{email}</p>
        <p className="font-['Inter'] text-base text-gray-300">{code}</p>
      </div>
    </div>
  </div>
);

export default UserProfile;
