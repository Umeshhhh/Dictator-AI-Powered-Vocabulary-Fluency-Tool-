import ContactUsButton from "../../components/ContactUsButton";
import Features from "../../components/Features";
import DotBackground from "../../components/GridDotBackground";
import LoginUser from "../../components/LoginUser";
import MainPage from "../../components/MainPage";
import SideBar from "../../components/SideBar";
import WordOfTheDay from "../../components/WordOfTheDay";

export default function Home() {

  return (
    <div className="w-full min-h-screen">
      <DotBackground dotSize={0.5} spacing={50}>
        <SideBar />
        <LoginUser />
        <main className="h-screen z-10 w-full">
            {/* <div className="h-full w-full absolute top-0">
              <SmokeyCursor />
            </div> */}
          <MainPage />
        </main>
        <div className="w-full flex flex-col justify-center items-center">
          <WordOfTheDay />
          <Features />
        </div>
        <footer className="w-full bg-black">
          <ContactUsButton />
          <p className="text-center text-white p-3">© 2024 Dictator. Made with ❤️ for word lovers everywhere.</p>
        </footer>
      </DotBackground>
    </div>
  );
}
