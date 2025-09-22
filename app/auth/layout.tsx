export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-6 w-1/2 m-auto">
        <h1 className="text-2xl font-bold text-center">Job Apply Flow</h1>
        {children}
      </div>
    </main>
  );
}
