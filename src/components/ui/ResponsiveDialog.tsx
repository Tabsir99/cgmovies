import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./sheet";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import React from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";

interface ResponsiveDialogProps extends React.ComponentProps<typeof Dialog> {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  contentProps?: React.ComponentProps<typeof DialogContent>;
  modal?: boolean;
  title?: string;
}
export default function ResponsiveDialog({
  children,
  trigger,
  side = "bottom",
  contentProps,
  title = "Responsive Dialog",
  ...props
}: ResponsiveDialogProps) {
  const isMobile = useUIStore((state) => state.isMobile);

  const Container = isMobile ? Sheet : Dialog;
  const Content = isMobile ? SheetContent : DialogContent;
  const Trigger = isMobile ? SheetTrigger : DialogTrigger;
  const Title = isMobile ? SheetTitle : DialogTitle;

  if (isMobile === undefined) return null;

  return (
    <Container {...props}>
      {trigger ? <Trigger asChild>{trigger}</Trigger> : null}

      <Content
        side={side}
        showCloseButton={contentProps?.showCloseButton}
        className={cn(
          "flex flex-col gap-0 p-0 overflow-hidden md:max-w-[90vw] h-[85dvh]",
          contentProps?.className,
        )}
      >
        <Title className="sr-only">{title}</Title>
        {children}
      </Content>
    </Container>
  );
}
