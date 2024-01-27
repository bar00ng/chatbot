import Image from "next/image";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />

      <main className="relative m-auto p-4">
        <div className="absolute inset-0 h-screen w-full">
          <Image
            src="/images/HomeBg.jpeg"
            alt="Esa Unggul University"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative z-10">{children}</div>
      </main>
    </>
  );
}
