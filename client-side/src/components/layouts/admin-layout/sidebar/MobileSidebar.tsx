import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetHeader>
        <SheetTitle className="sr-only">Меню навигации</SheetTitle>
      </SheetHeader>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}