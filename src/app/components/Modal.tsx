"use client";

import useModalStore from "../store/modalStore";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

const Modal: React.FC = () => {
  const { isOpen, isEdit, closeModal, setEditFalse } = useModalStore();

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative h-4/5 w-3/4 bg-white">
          <button
            className="absolute right-8 top-5 text-4xl"
            onClick={() => {
              closeModal();
              setEditFalse();
            }}
          >
            x
          </button>
          {isEdit ? <EditForm /> : <AddForm />}
        </div>
      </div>
    )
  );
};

export default Modal;
