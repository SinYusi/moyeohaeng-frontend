import React from "react";

// TODO 1.전역으로 사용 에정, 2. UI 리펙토링(피그마와 다름)

interface UserAvatarProps {
  userColor: "red" | "yellow";
  size?: "sm" | "md";
}

const UserAvatar: React.FC<UserAvatarProps> = ({ userColor, size = "md" }) => {
  const sizeClasses = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  const innerSizeClasses = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const iconSizeClasses = size === "sm" ? "w-3 h-2.5" : "w-4 h-3.5";
  const iconPosition =
    size === "sm" ? "left-[2.5px] top-[4.5px]" : "left-[3.25px] top-[5.50px]";

  return (
    <div
      className={`${sizeClasses} rounded-full flex justify-center items-center ${
        userColor === "red" ? "bg-red-500" : "bg-yellow-500"
      }`}
    >
      <div
        className={`${innerSizeClasses} relative rounded-full outline-1 outline-offset-[-1px] outline-white overflow-hidden ${
          userColor === "red" ? "bg-red-100" : "bg-yellow-100"
        }`}
      >
        <div
          className={`${iconSizeClasses} absolute ${iconPosition} ${
            userColor === "red" ? "bg-red-500" : "bg-yellow-500"
          }`}
        />
      </div>
    </div>
  );
};

export default UserAvatar;
