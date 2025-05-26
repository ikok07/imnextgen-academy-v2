import SectionHeading from "@/app/_components/ui/home/SectionHeading";
import {TEAM_MEMBERS} from "@/app/_utils/home/team/team-members";
import TeamMemberBox from "@/app/_components/home/team/TeamMemberBox";

export default function Team() {
    return <section id="team" className="home-center-section">
        <SectionHeading title="Екип, на когото да разчиташ " description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor" className="text-center"/>
        <div className="grid md:grid-cols-3 gap-6 mt-10 min-h-[20rem]">
            {TEAM_MEMBERS.map((member, index) => {
                return <TeamMemberBox {...member} key={index} />
            })}
        </div>
    </section>
}