import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../globals.css";


export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
    <div className="blog-social-ad hidden lg:block">
  <div id="7SAD1569931FD995AB7" data-7pub="7SAD1569931FD995AB7"></div>
</div>

  );
}
