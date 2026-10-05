import React from "react";
import { HelpCircle, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../i18n";
import { InfoCard } from "@/components/InfoCard";

export const AboutPage: React.FC = () => {
  const { user } = useAuth();
  const { t, format } = useTranslation();

  const labels = {
    ...t.about,
    welcome: format(t.home.welcome, { name: user?.name || "Daniel" }),
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

        {/* Quick Links / Info Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<Info className="h-5 w-5 text-primary" />}
            title={labels.hoursTitle}
            body={labels.hoursBody}
          />

          <InfoCard
            icon={<HelpCircle className="h-5 w-5 text-primary" />}
            title={labels.locationTitle}
            body={labels.locationBody}
          />
          <InfoCard
            icon={<HelpCircle className="h-5 w-5 text-primary" />}
            title={labels.tipTitle}
            body={labels.tipBody}
          />
        </section>
      </div>
    </div>
  );
};
