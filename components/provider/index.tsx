"use client";

import { ModalProvider } from "./dialog-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}
