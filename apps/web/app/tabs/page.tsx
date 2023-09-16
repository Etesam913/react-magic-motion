"use client";
import Link from "next/link";
import "../../global.css";
import Tabs from "ui/tabs";

export default function TabsPage() {
  return (
    <main>
      <Link href="/" className="go-back">
        Go To Home 👈
      </Link>
      <h1>Tabs</h1>
      <Tabs>
        <div>test</div>
      </Tabs>
    </main>
  );
}
