"use client";

import useModalStore from "../store/modalStore";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

const Modal: React.FC = () => {
  const { isOpen, isEdit, closeModal, setEditFalse } = useModalStore();

  return (
    isOpen && (
      <div
        onClick={() => {
          closeModal();
          setEditFalse();
        }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-60"
      >
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="min-h-5/6 min-w-3/5 relative rounded-xl bg-white pb-14 pl-20 pr-20 pt-20 dark:bg-gray-600"
        >
          <button
            className="absolute right-8 top-5 text-4xl dark:text-gray-200"
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
