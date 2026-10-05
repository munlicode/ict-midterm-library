import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Info, List } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../i18n";

export const SignInPage: React.FC = () => {
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      signIn();
      navigate("/home");
    }, 2000);
  };

  const text = t.signIn;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-border shadow-md transition-all transform animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mb-3 border border-orange-100">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-foreground tracking-tight">
            {t.common.appName}
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1 font-medium">
            {text.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4 text-center">
          <p className="text-sm text-gray-500">{text.instruction}</p>
          <Button
            disabled={isLoading}
            onClick={handleSignIn}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-6 text-base shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-80"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{text.signingIn}</span>
              </div>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2 shrink-0"
                  viewBox="0 0 23 23"
                  fill="currentColor"
                >
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                {text.button}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md mt-4 bg-white border-border">
        <CardHeader className="text-center pb-0">
          <CardDescription>{text.publicLinks}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          {[
            { to: "/about", label: t.nav.about, Icon: Info },
            { to: "/rules", label: t.nav.rules, Icon: List },
          ].map(({ to, label, Icon }) => (
            <Link key={to} to={to} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-border hover:text-primary"
              >
                <Icon className="h-4 w-4 mr-1.5 text-primary" />
                {label}
              </Button>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
