import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";

export function HeaderCart() {
  return (
    <Sheet>
      <SheetTrigger>
        <span className='cursor-pointer px-4 py-2 hover:opacity-80 text-sm'>Корзина</span>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 bg-black text-white">
        <SheetTitle className="sr-only">Корзина</SheetTitle>
        <div>Корзина</div>
      </SheetContent>
    </Sheet>
  )
}