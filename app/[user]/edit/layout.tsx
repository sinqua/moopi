export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex flex-col items-center w-full h-auto min-h-full">
        {children}
      </div>
    </>
  );
}
