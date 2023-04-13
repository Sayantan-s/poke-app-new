import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { Portal } from "../utils";

export interface ModalProps {
  show: boolean;
  onHide: () => void;
  className: string;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  show,
  onHide,
  children,
  className,
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.hasAttribute("open") && ref.current?.removeAttribute("open");
    if (show) {
      ref.current?.showModal();
    } else ref.current?.close();
  }, [show]);

  return (
    <Portal selector=".modals">
      {show ? (
        <dialog
          className={`relative z-40 p-6 backdrop:backdrop-blur-xl rounded-xl shadow-stone-950/20 backdrop:bg-stone-950/50 flex-col ${className}`}
          ref={ref}
        >
          <button
            className="bg-rose-100 flex items-center justify-center rounded-full absolute right-3 top-3 w-7 h-7"
            onClick={onHide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 stroke-rose-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </dialog>
      ) : null}
    </Portal>
  );
};
