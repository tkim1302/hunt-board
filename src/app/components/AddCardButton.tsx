"use client";

import useModalStore from "../store/modalStore";
import useSectionStore from "../store/sectionStore";

interface SectionProp {
  sectionTitle: string;
}

const AddCardButton: React.FC<SectionProp> = ({ sectionTitle }) => {
  const { openModal } = useModalStore();
  const { setSection } = useSectionStore();

  const handleClick = () => {
    openModal();
    setSection(sectionTitle);
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
