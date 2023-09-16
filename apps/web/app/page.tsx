import "../global.css";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <main>
      <h1>Components Hub</h1>
      <Link href="/expandable-cards">Go To Expandable Card 👉</Link>
      <Link href="/tabs">Go To Tabs 👉</Link>
    </main>
  );
}
