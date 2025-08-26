import { privacyPolicyContent } from "../../lib/privacyPolicy";
import { termsOfServiceContent } from "../../lib/termsOfService";
import ColorBackgroundBtn from "../common/ColorBackgroundBtn";

// 타입 정의
interface SectionItem {
  label?: string;
  content?: string;
}

interface Section {
  subtitle: string;
  items: (string | SectionItem)[];
  note?: string;
}

interface ContentItem {
  id: number;
  title: string;
  description?: string;
  sections?: Section[];
  numberedList?: string[];
  items?: string[];
  note?: string;
}

interface PopupProps {
  title: string;
  content: string;
  onClose: () => void;
  onAgree?: () => void;
}

const TermsModal = ({ title, content, onClose, onAgree }: PopupProps) => {
  const renderSection = (section: Section) => {
    if (section.subtitle) {
      return (
        <div key={section.subtitle}>
          <h4 className="font-medium text-gray-800 mb-2">{section.subtitle}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {section.items.map((item: string | SectionItem, index: number) => (
              <li key={index}>
                {typeof item === "string" ? (
                  item
                ) : (
                  <>
                    <strong>{item.label}:</strong> {item.content}
                  </>
                )}
              </li>
            ))}
          </ul>
          {section.note && (
            <p className="text-xs text-gray-600 mt-1">{section.note}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderContent = (item: ContentItem) => {
    if (item.sections) {
      return (
        <div key={item.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          {item.sections.map((section: Section) => renderSection(section))}
        </div>
      );
    }

    if (item.numberedList) {
      return (
        <div key={item.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          {item.description && <p className="text-sm">{item.description}</p>}
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            {item.numberedList.map((listItem: string, index: number) => (
              <li key={index}>{listItem}</li>
            ))}
          </ol>
          {item.note && <p className="text-xs text-gray-600">{item.note}</p>}
        </div>
      );
    }

    if (item.items) {
      return (
        <div key={item.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          {item.description && <p className="text-sm">{item.description}</p>}
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {item.items.map((listItem: string, index: number) => (
              <li key={index}>{listItem}</li>
            ))}
          </ul>
          {item.note && <p className="text-xs text-gray-600">{item.note}</p>}
        </div>
      );
    }

    if (item.description) {
      return (
        <div key={item.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <p className="text-sm">{item.description}</p>
        </div>
      );
    }

    return null;
  };

  // content prop에 따라 어떤 약관 내용을 표시할지 결정
  const getContentData = (): ContentItem[] => {
    if (content === "privacy") {
      return privacyPolicyContent;
    } else if (content === "terms") {
      return termsOfServiceContent;
    }
    return [];
  };

  const contentData = getContentData();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[570px] h-[694px] rounded-2xl shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex flex-row items-center w-full relative mt-6 mb-4">
          <span
            className="w-12 h-12 text-[#131416] text-[24px] font-bold cursor-pointer flex items-center justify-center absolute left-3"
            onClick={onClose}
          >
            &lt;
          </span>
          <p className="text-[24px] font-bold text-[#131416] flex-1 text-center">
            {title}
          </p>
        </div>

        {/* 본문 (스크롤 가능) */}
        <div className="relative flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-6 py-4 text-sm text-gray-700 leading-relaxed">
            <div className="space-y-6 pb-8">
              {contentData.map(renderContent)}
            </div>
          </div>

          {/* 개선된 하단 그라데이션 오버레이 */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white via-white/95 via-white/80 to-transparent" />
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-3 p-4 relative">
          <ColorBackgroundBtn
            className="flex-1"
            onClick={() => {
              if (onAgree) {
                onAgree();
              }
              onClose();
            }}
          >
            동의
          </ColorBackgroundBtn>
          <ColorBackgroundBtn
            onClick={onClose}
            backgroundColor="#fff"
            textColor="#131416"
            className="flex-1 border border-[#c0c7c2]"
          >
            비동의
          </ColorBackgroundBtn>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
