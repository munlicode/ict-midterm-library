import React from "react";
import { Utensils, VolumeX } from "lucide-react";
import { useTranslation } from "../i18n";
import { InfoCard } from "@/components/InfoCard";

export const RulesPage: React.FC = () => {
  const { t } = useTranslation();

  const labels = {
    ...t.rules,
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 max-w-240 w-full mx-auto px-6 py-8">
        {/* Title Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">
            {labels.title}
          </h1>
          <p className="text-gray-600">{labels.body}</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<Utensils className="h-5 w-5 text-primary" />}
            title={labels.foodTitle}
            body={labels.foodBody}
          />
          <InfoCard
            icon={<VolumeX className="h-5 w-5 text-primary" />}
            title={labels.quietTitle}
            body={labels.quietBody}
          />
        </section>
      </div>
    </div>
  );
};
