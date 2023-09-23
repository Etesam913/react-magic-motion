import { Instrument_Sans as InstrumentSans } from "next/font/google";

const instrumentSans = InstrumentSans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>{children}</body>
    </html>
  );
}
