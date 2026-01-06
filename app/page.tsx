import Header from "./components/Header";
import ActionButtons from "./components/ActionButtons";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <ActionButtons />
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}