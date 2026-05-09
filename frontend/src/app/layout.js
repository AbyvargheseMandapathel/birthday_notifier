import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "BirthdayRemainder | Premium Birthday Reminders",
  description: "Never miss a special moment again with our smart reminder engine.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans bg-slate-50 text-slate-900 antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
