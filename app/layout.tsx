import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ActiveThemeProvider } from "@/components/active-theme"
import { cookies as nextCookies } from "next/headers";
import cn from "classnames";




export const metadata: Metadata = {
  title: "My Dashboard",
  description: "A Modern & Minimalistic Dashoard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const activeThemeValue = cookieStore.get("active_theme")?.value
  const isScaled = activeThemeValue?.endsWith("-scaled")
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : "",
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
             <ActiveThemeProvider initialTheme={activeThemeValue}>
        {children}
             </ActiveThemeProvider>
          </ThemeProvider>
            
      </body>
    </html>
  );
}
async function cookies() {
  return nextCookies();
}

