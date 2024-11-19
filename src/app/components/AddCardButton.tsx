"use client";

import useModalStore from "../store/modalStore";

const AddCardButton: React.FC = () => {
  const { openModal } = useModalStore();
  return (
    <button
      className="w-48 rounded-xl border border-gray-500 text-2xl shadow-md"
      onClick={openModal}
    >
      +
    </button>
  );
};

export default AddCardButton;
