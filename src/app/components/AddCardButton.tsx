"use client";

import useModalStore from "../store/modalStore";
import useSectionStore from "../store/sectionStore";

interface SectionProp {
  sectionName: string;
}
const AddCardButton: React.FC<SectionProp> = ({ sectionName }) => {
  const { openModal } = useModalStore();
  const { setSection } = useSectionStore();

  const handleClick = () => {
    openModal();
    setSection(sectionName);
  };

  return (
    <button
      className="w-48 rounded-xl border border-gray-500 text-2xl shadow-md"
      onClick={handleClick}
    >
      +
    </button>
  );
};

export default AddCardButton;
