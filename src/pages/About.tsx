import React from "react";
import { HelpCircle, Info } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../i18n";

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
          <Card className="bg-white border-border">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">
                {labels.hoursTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 leading-relaxed">
                {labels.hoursBody}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-border">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">
                {labels.locationTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 leading-relaxed">
                {labels.locationBody}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-border">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">
                {labels.helpTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 leading-relaxed">
                {labels.helpBody}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-border">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">
                {labels.tipTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 leading-relaxed">
                {labels.tipBody}
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
