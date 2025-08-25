import { useState, useEffect } from "react";
import Checkbox from "../common/CheckBox";
import ColorTextBtn from "../common/ColorTextBtn";

interface AgreementSectionProps {
  onRequiredAgreementChange: (isCompleted: boolean) => void;
}

interface AgreementState {
  all: boolean;
  age: boolean;
  terms: boolean;
  privacy: boolean;
}

const AgreementSection = ({ onRequiredAgreementChange }: AgreementSectionProps) => {
  const [agreements, setAgreements] = useState<AgreementState>({
    all: false,
    age: false,
    terms: false,
    privacy: false,
  });

  useEffect(() => {
    const isAllRequiredChecked = agreements.age && agreements.terms && agreements.privacy;
    onRequiredAgreementChange(isAllRequiredChecked);
  }, [agreements, onRequiredAgreementChange]);

  const handleAllAgreement = (checked: boolean) => {
    const newAgreements = {
      all: checked,
      age: checked,
      terms: checked,
      privacy: checked,
    };
    setAgreements(newAgreements);
  };

  const handleIndividualAgreement = (key: keyof Omit<AgreementState, 'all'>, checked: boolean) => {
    const newAgreements = {
      ...agreements,
      [key]: checked,
    };
    
    newAgreements.all = newAgreements.age && newAgreements.terms && newAgreements.privacy;
    
    setAgreements(newAgreements);
  };

  return (
    <div className="w-full">
      {/* 제목과 전체동의 */}
      <div className="flex justify-between items-center mb-6 border-b border-[#Edf0f4] pb-5">
        <h2 className="text-xl font-bold text-[#131416]">서비스 정책</h2>
        <Checkbox
          label="전체동의"
          checked={agreements.all}
          onChange={handleAllAgreement}
        />
      </div>

      {/* 개별 동의 항목들 */}
      <div className="space-y-4">
        <Checkbox
          label="만 14세 이상입니다. (필수)"
          checked={agreements.age}
          onChange={(checked) => handleIndividualAgreement("age", checked)}
        />

        <div className="flex justify-between items-center">
          <Checkbox
            label="서비스 이용약관 동의 (필수)"
            checked={agreements.terms}
            onChange={(checked) => handleIndividualAgreement("terms", checked)}
          />
          <ColorTextBtn color="#131416" className="underline">
            내용보기
          </ColorTextBtn>
        </div>

        <div className="flex justify-between items-center">
          <Checkbox
            label="개인정보 수집 및 이용 동의 (필수)"
            checked={agreements.privacy}
            onChange={(checked) =>
              handleIndividualAgreement("privacy", checked)
            }
          />
          <ColorTextBtn color="#131416" className="underline">
            내용보기
          </ColorTextBtn>
        </div>
      </div>
    </div>
  );
};

export default AgreementSection;
