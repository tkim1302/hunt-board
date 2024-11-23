"use client";

import useModalStore from "../store/modalStore";
import useSectionStore from "../store/sectionStore";

interface SectionProp {
  sectionId: string;
}

const AddCardButton: React.FC<SectionProp> = ({ sectionId }) => {
  const { openModal } = useModalStore();
  const { setSection } = useSectionStore();

  const handleClick = () => {
    openModal();
    setSection(sectionId);
  };

  return (
    <button
      className="w-48 rounded-xl border border-gray-500 text-2xl shadow-md hover:text-blue-500"
      onClick={handleClick}
    >
      +
    </button>
  );
};

export default AddCardButton;
