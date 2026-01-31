import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./sheet";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import React from "react";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/playerStore";

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
  const isMobile = usePlayerStore((state) => state.isMobile);

  const Container = isMobile ? Sheet : Dialog;
  const Content = isMobile ? SheetContent : DialogContent;
  const Trigger = isMobile ? SheetTrigger : DialogTrigger;
  const Title = isMobile ? SheetTitle : DialogTitle;

  if (isMobile === undefined) return null;

  return (
    <Container {...props}>
      {trigger ? <Trigger asChild>{trigger}</Trigger> : null}
      <Title className="sr-only">{title}</Title>

      <Content
        side={side}
        {...contentProps}
        className={cn(
          "max-md:w-full max-h-[90dvh] overflow-y-auto p-4",
          contentProps?.className,
        )}
      >
        {children}
      </Content>

      {props.open && (
        <div className="fixed top-0 left-0 bg-black/40 w-screen h-screen z-20" />
      )}
    </Container>
  );
}
