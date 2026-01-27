import Image from "next/image";
import { Book, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function TutorPanel() {
  const masteryLevel = 65;

  return (
    <aside className="flex h-full w-[300px] flex-col bg-[#161b22] p-4">
      {/* Portrait with Status Badge */}
      <div className="relative mb-4">
        {/* Status Badge */}
        <Badge
          variant="secondary"
          className="absolute right-2 top-2 z-10 bg-white/90 text-gray-800"
        >
          <Circle className="size-2 fill-green-500 text-green-500" />
          Explaining
        </Badge>

        {/* Portrait Image */}
        <div className="overflow-hidden rounded-lg border-2 border-gray-700">
          <Image
            src="/adam-smith.jpg"
            alt="Adam Smith portrait"
            width={268}
            height={300}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Name Section */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-white">Adam Smith</h2>
        <p className="text-sm text-gray-400">The Father of Economics</p>
      </div>

      {/* Current Focus Section */}
      <div className="mb-6">
        <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-gray-500">
          Current Focus
        </span>

        <div className="space-y-2">
          {/* Concept Card */}
          <Card className="border-gray-700 bg-gray-800/50 py-3">
            <CardContent className="flex items-center gap-3 px-3 py-0">
              <Circle className="size-3 flex-shrink-0 fill-blue-500 text-blue-500" />
              <div className="min-w-0">
                <p className="text-xs text-gray-400">Concept</p>
                <p className="truncate font-medium text-white">
                  Division of Labor
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Source Card */}
          <Card className="border-gray-700 bg-gray-800/50 py-3">
            <CardContent className="flex items-center gap-3 px-3 py-0">
              <Book className="size-4 flex-shrink-0 text-amber-500" />
              <div className="min-w-0">
                <p className="text-xs text-gray-400">Source</p>
                <p className="truncate font-medium text-white">
                  Book I, Chapter I
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mastery Level */}
      <div className="mt-auto">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-400">Mastery Level</span>
          <span className="font-medium text-blue-500">{masteryLevel}%</span>
        </div>
        <Progress
          value={masteryLevel}
          className="h-2 bg-gray-700 [&>[data-slot=progress-indicator]]:bg-blue-500"
        />
      </div>
    </aside>
  );
}
