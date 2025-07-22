import "./globals.css";
import React from "react";
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export const metadata = {
  title: "doc2deck",
  description: "Convert documents to slide decks (M0 bootstrap + Auth)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.5rem 0"}}>
            <div>doc2deck</div>
            <div>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
