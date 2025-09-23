import Heading from "@/components/ui/heading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-6 w-1/2 m-auto">
        <Heading level="h1" className="text-center">
          Job Apply Flow
        </Heading>
        {children}
      </div>
    </main>
  );
}
