"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/shadcn/dialog";

type ModalContextValue = {
  showModal: (title: string, content: React.ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = React.createContext<ModalContextValue | undefined>(
  undefined,
);

export function useModal() {
  const ctx = React.useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return ctx;
}

type ModalProviderProps = {
  children: React.ReactNode;
};

export function ModalProvider({ children }: ModalProviderProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState<React.ReactNode>(null);

  const showModal = React.useCallback(
    (newTitle: string, node: React.ReactNode) => {
      setTitle(newTitle);
      setContent(node);
      setOpen(true);
    },
    [],
  );

  const closeModal = React.useCallback(() => {
    setOpen(false);
    // if you want to clear content when closing, you can do it here
    setTitle("");
    setContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeModal();
          }
        }}
      >
        <DialogOverlay className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50" />

        <DialogContent className="rounded-xl max-w-none! w-auto mx-auto self-center z-50">
          {title && <DialogTitle>{title}</DialogTitle>}
          {content}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
}
