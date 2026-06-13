export default function BackgroundGlow() {
  return (
    <>
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-purple-500/20 blur-[150px]" />
    </>
  );
}
