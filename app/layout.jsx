import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";

export const metadata = {
  title: "HodlHabits",
  description: "Generate new On-Chain habits. Create habits that are stored on the blockchain and earn rewards for completing them!",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </body>
      </html>
    </ViewTransitions>
  );
}