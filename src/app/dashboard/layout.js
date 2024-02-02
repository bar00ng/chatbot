import Image from "next/image";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <main className="relative m-auto p-4">
        <NavBar />
        <div className="absolute inset-0 h-screen w-full">
          <Image
            src="/images/HomeBg.jpeg"
            alt="Esa Unggul University"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-10 mt-16 text-white">{children}</div>
      </main>
    </>
  );
}
