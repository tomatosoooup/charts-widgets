import { ControlPanel } from "@/components/control-panel";

export default function Home() {
  return (
    <>
      <main className="h-screen overflow-y-auto flex py-5 px-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/80 to to-sky-700/90">
        <ControlPanel />
      </main>
    </>
  );
}
