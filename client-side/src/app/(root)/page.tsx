import type { Metadata } from "next";
import { Home } from "./Home";

export const metadata: Metadata = {
  title: 'Home',
}

export default function HomePage() {
  return <Home />
}