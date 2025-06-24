import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";
import { Menu } from "lucide-react";
import styles from '../Header.module.scss'

export function DarkMobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className={`${styles.header__menuTrigger} lg:hidden hover:opacity-75 transition`}>
        <Menu />
      </SheetTrigger>
      <SheetHeader className="sr-only">
        <SheetTitle className="sr-only">Меню навигации</SheetTitle>
      </SheetHeader>
      <SheetContent side="left" className="p-0 bg-black text-white">
        <div>Боковое меню</div>
      </SheetContent>
    </Sheet>
  );
}