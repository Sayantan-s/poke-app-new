import { useMounted } from "@/hooks";
import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface Props extends PropsWithChildren {
  selector: string;
}

export const Portal: FC<Props> = ({ children, selector }) => {
  const isMounted = useMounted();
  return isMounted
    ? createPortal(children, document.querySelector(selector) as HTMLDivElement)
    : null;
};
