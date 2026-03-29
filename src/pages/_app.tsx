import "@/styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { LanguageProvider } from "@/context/LanguageContext";
import Cursor    from "@/components/Cursor";
import StatusBar from "@/components/StatusBar";
import Hamburger from "@/components/Hamburger";
import Sidebar   from "@/components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <LanguageProvider>
      <Cursor />
      <Hamburger open={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} />
      <Sidebar   open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <StatusBar />
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
