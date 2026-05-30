
export const metadata = {
  title: "DevPulse",
  description: "Developer Market Intelligence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
