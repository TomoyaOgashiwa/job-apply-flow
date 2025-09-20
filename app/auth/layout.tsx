export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="size-full overflow-auto">
      <h1>Job Apply Flow</h1>
      {children}
    </main>
  );
}
