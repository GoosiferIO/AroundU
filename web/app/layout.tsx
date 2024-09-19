import '@/styles/globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-1 flex-col">
        <main id="content" className="flex flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
