export function Footer() {
  const version = import.meta.env.VITE_RELEASE_VERSION;
  return (
    <div className="flex w-[100%] justify-between px-[40px] py-[20px] bg-[var(--color-black)]">
      <div>
        <p className="text-[var(--color-white)]">ВЭДО - 2025</p>
      </div>
      <div>
        <p className="text-[var(--color-gray)] text-[14px]">Build: {version}</p>
      </div>
    </div>
  );
}
