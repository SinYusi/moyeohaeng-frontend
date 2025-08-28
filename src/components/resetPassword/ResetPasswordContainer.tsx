import { useState } from "react";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordTitle from "./ResetPasswordTitle";

const ResetPasswordContainer = () => {
  const [email, setEmail] = useState<string>("");
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  return (
    <div className="w-[390px] flex flex-col">
      <ResetPasswordTitle />
      {isEmailSent ? (
        <ResetPasswordSuccess email={email} />
      ) : (
        <ResetPasswordForm
          email={email}
          setEmail={setEmail}
          setIsEmailSent={setIsEmailSent}
        />
      )}
    </div>
  );
};

export default ResetPasswordContainer;
