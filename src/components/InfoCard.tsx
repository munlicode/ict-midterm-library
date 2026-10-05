import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  body: string;
}> = ({ icon, title, body }) => (
  <Card className="bg-white border-border">
    <CardHeader className="flex flex-row items-center gap-3 pb-2">
      {icon}
      <CardTitle className="text-base font-bold text-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
    </CardContent>
  </Card>
);
