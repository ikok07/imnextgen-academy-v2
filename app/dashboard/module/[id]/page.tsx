import {getSectionsForModule, getVideosForSection} from "@/app/dashboard/actions";

export default async function Page() {
    // const sections = await getSectionsForModule("6c9d5807-fc77-483e-a0da-b67aa151626e");
    const videos = await getVideosForSection("b0ab7cfc-ff3f-4939-ab86-6ee10085dc4b")
    
    return <div>

    </div>
}