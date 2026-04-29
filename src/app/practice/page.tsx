import DotBackground from "../../../components/GridDotBackground";
import LoginUser from "../../../components/LoginUser";
import PracticePage from "../../../components/PracticePage";
import SideBar from "../../../components/SideBar";
import { getUserStats, getSRSWords } from "@/app/actions/userActions";

export const dynamic = "force-dynamic";

export default async function Practice(){
    const stats = await getUserStats();
    const srsWords = await getSRSWords();

    return(
        <div className="w-full min-h-screen">
            <DotBackground dotSize={.5} spacing={50}>
                <SideBar />
                <LoginUser />
                <main className="w-full">
                    <PracticePage stats={stats} srsWords={srsWords} />
                </main>
            </DotBackground>
        </div>
    )
}
