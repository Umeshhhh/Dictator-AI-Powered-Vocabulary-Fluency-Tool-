import { headers } from "next/headers";

export const getIp = async  () => {

    const headerStore = await headers();

    return (
        headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() || 
        headerStore.get("x-real-ip") || 
        "unknown"
    );

}