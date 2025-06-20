import { STORE_URL } from "@/config/url.config";
import { IMenuItem } from "./menu.interface";
import { Album, Briefcase, FolderKanban, Star } from "lucide-react";

	export const routes: IMenuItem[] = [
		{
			icon: FolderKanban,
			link: STORE_URL.products(),
			value: 'Товары'
		},
		{
			icon: Album,
			link: STORE_URL.categories(),
			value: 'Категории'
		},
		{
			icon: Star,
			link: STORE_URL.reviews(),
			value: 'Отзывы'
		},
    {
      icon: Briefcase,
      link: STORE_URL.orders(),
      value: 'Заказы'
    },
	]