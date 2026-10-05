import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, LogIn } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { useTranslation } from "../i18n";

export const ExpiredPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const labels = t.expired;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-border shadow-sm text-center">
        <CardHeader className="pb-2">
          <div className="mx-auto bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-3 border border-amber-200">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {labels.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <p className="text-sm text-gray-600 leading-relaxed">
            {labels.message}
          </p>
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-5 text-base"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {labels.button}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
