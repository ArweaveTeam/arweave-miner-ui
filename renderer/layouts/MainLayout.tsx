import Navbar from "../components/Navbar";

interface Props {
  children: React.ReactNode | React.ReactNodeArray;
}

export default function MainLayout({ children }: Props) {
  return (
    <section className="min-h-screen w-full bg-[#F1F1F1]">
      <Navbar />
      {children}
    </section>
  );
}
