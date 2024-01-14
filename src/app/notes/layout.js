import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />

      <main className="p-4 max-w-7xl m-auto">{children}</main>
    </>
  );
}
