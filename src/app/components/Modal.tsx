"use client";

import { ReactNode } from "react";
import useModalStore from "../store/modalStore";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isOpen, closeModal } = useModalStore();

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative h-4/5 w-3/4 bg-white">
          <button
            className="absolute right-8 top-5 text-4xl"
            onClick={closeModal}
          >
            x
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
