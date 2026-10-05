import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../i18n";
import { BOOKS } from "../data/books";

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { t, format } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/search");
    }
  };

  const currentReadings = [
    {
      book: BOOKS[0], // Introduction to Algorithms
      dueDate: "Oct 18, 2026",
    },
    {
      book: BOOKS[3], // Computer Networking
      dueDate: "Oct 24, 2026",
    },
    {
      book: BOOKS[9], // Чистая архитектура
      dueDate: "Nov 02, 2026",
    },
  ];

  const labels = {
    ...t.home,
    welcome: format(t.home.welcome, { name: user?.name || "Daniel" }),
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 max-w-240 w-full mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#2D2D2D] tracking-tight mb-2">
            {labels.welcome}
          </h1>
          <p className="text-gray-600">{labels.intro}</p>
        </div>

        {/* Search Bar Section */}
        <section className="mb-10 bg-white p-6 rounded-xl border border-[#E5DFD3] shadow-sm">
          <form onSubmit={handleSearchSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={labels.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 text-base border-[#E5DFD3] focus-visible:ring-[#DC4C2C] bg-[#FBF9F4]"
              />
            </div>
            <Button
              type="submit"
              className="bg-[#DC4C2C] hover:bg-[#b83d21] text-white px-6 h-12 font-semibold text-base"
            >
              {labels.searchButton}
            </Button>
          </form>
        </section>

        {/* Current Readings Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#2D2D2D] mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#DC4C2C]" />
            {labels.currentReadingsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentReadings.map(({ book, dueDate }) => (
              <Card
                key={book.id}
                className="bg-white border-[#E5DFD3] flex flex-col justify-between"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold text-gray-900 line-clamp-2 leading-snug">
                    {book.title}
                  </CardTitle>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                    {book.author}
                  </p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center text-xs text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded border border-amber-200">
                    <Clock className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                    <span>
                      {labels.due}:{" "}
                      <strong className="font-semibold">{dueDate}</strong>
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    disabled
                    variant="outline"
                    className="w-full text-xs h-8 text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed"
                  >
                    {labels.renewDisabled}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
