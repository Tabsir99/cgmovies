import { CastMember, CrewMember } from "@/types/media";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getImageUrl } from "@/lib/tmdb";

interface CastSectionProps {
  cast: CastMember[];
  crew?: CrewMember[];
}

export function CastSection({ cast, crew }: CastSectionProps) {
  // Get top 15 cast members
  const topCast = cast.slice(0, 15);

  // Get key crew members (Director, Writer, Producer)
  const keyCrew = crew
    ?.filter(
      (member) =>
        member.job === "Director" ||
        member.job === "Writer" ||
        member.job === "Executive Producer" ||
        member.job === "Producer"
    )
    .slice(0, 5);

  if (topCast.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Cast & Crew</h2>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-6 pb-4">
          {/* Cast Members */}
          {topCast.map((member) => (
            <CastCard key={member.id} member={member} />
          ))}

          {/* Key Crew Members */}
          {keyCrew && keyCrew.length > 0 && (
            <>
              {/* Separator */}
              <div className="w-px h-32 bg-white/20 my-auto flex-shrink-0" />

              {keyCrew.map((member) => (
                <CrewCard key={`${member.id}-${member.job}`} member={member} />
              ))}
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

function CastCard({ member }: { member: CastMember }) {
  const imageUrl = member.profile_path
    ? getImageUrl(member.profile_path, "w185")
    : null;

  return (
    <div className="flex flex-col items-center gap-3 w-[120px] flex-shrink-0">
      <Avatar className="h-24 w-24 ring-2 ring-white/10">
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt={member.name} />
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg font-bold">
            {member.name.charAt(0)}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="text-center w-full">
        <p className="text-white text-sm font-medium line-clamp-2 leading-tight">
          {member.name}
        </p>
        <p className="text-white/60 text-xs line-clamp-2 mt-1">
          {member.character}
        </p>
      </div>
    </div>
  );
}

function CrewCard({ member }: { member: CrewMember }) {
  const imageUrl = member.profile_path
    ? getImageUrl(member.profile_path, "w185")
    : null;

  return (
    <div className="flex flex-col items-center gap-3 w-[120px] flex-shrink-0">
      <Avatar className="h-24 w-24 ring-2 ring-white/10">
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt={member.name} />
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-lg font-bold">
            {member.name.charAt(0)}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="text-center w-full">
        <p className="text-white text-sm font-medium line-clamp-2 leading-tight">
          {member.name}
        </p>
        <p className="text-white/60 text-xs line-clamp-2 mt-1">
          {member.job}
        </p>
      </div>
    </div>
  );
}
