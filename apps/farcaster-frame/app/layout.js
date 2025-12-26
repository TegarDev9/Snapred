import './globals.css';

export const metadata = {
  title: 'Snapred Farcaster Frame',
  description: 'Frame entrypoint for the Snapred experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
