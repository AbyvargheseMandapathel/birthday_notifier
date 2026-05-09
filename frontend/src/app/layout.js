import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "BirthdayRemainder | Premium Birthday Reminders",
  description: "Never miss a special moment again with our smart reminder engine.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans bg-zinc-50 text-zinc-900 antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
