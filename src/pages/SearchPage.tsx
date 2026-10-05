import React, { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { Link, useSearchParams } from "react-router-dom";
import { Search, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { useTranslation, LANGUAGES } from "../i18n";
import { BOOKS } from "../data/books";
import type { Book } from "../data/books";

export const SearchPage: React.FC = () => {
  const { t, format } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [langFilter, setLangFilter] = useState<"ALL" | "EN" | "RU" | "KK">(
    "ALL",
  );
  const [yearFilter, setYearFilter] = useState<
    "ALL" | "2020_NEWER" | "2010_2019" | "BEFORE_2010"
  >("ALL");
  const [availFilter, setAvailFilter] = useState<"ALL" | "AVAILABLE">("ALL");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // 1. Apply non-text filters (plain .filter)
  const preFiltered = BOOKS.filter((book) => {
    if (langFilter !== "ALL" && book.language !== langFilter) return false;
    if (yearFilter === "2020_NEWER" && book.year < 2020) return false;
    if (yearFilter === "2010_2019" && (book.year < 2010 || book.year > 2019))
      return false;
    if (yearFilter === "BEFORE_2010" && book.year >= 2010) return false;
    if (availFilter === "AVAILABLE" && !book.available) return false;
    return true;
  });

  // 2. Run Fuse on the pre-filtered subset
  const fuse = useMemo(
    () => new Fuse<Book>(preFiltered, { keys: ["title", "author"] }),
    [preFiltered],
  );

  const filteredBooks = query.trim()
    ? fuse.search(query.trim()).map(({ item }) => item)
    : preFiltered;

  const clearFilters = () => {
    setQuery("");
    setLangFilter("ALL");
    setYearFilter("ALL");
    setAvailFilter("ALL");
    setSearchParams({});
  };

  const uiLabels = {
    ...t.search,
    resultCount: format(
      filteredBooks.length === 1
        ? t.search.resultCountOne
        : t.search.resultCountMany,
      { count: filteredBooks.length },
    ),
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 max-w-240 w-full mx-auto px-6 py-8">
        <h1 className="text-3xl font-extrabold text-[#2D2D2D] mb-6">
          {uiLabels.title}
        </h1>

        {/* Filter Controls Panel */}
        <div className="bg-white p-6 rounded-xl border border-[#E5DFD3] shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                {uiLabels.searchLabel}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={uiLabels.searchPlaceholder}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (e.target.value) {
                      setSearchParams({ q: e.target.value });
                    } else {
                      setSearchParams({});
                    }
                  }}
                  className="pl-9 h-10 border-[#E5DFD3] text-sm bg-[#FBF9F4]"
                />
              </div>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                {uiLabels.langLabel}
              </label>
              <select
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value as any)}
                className="w-full h-10 px-3 border border-[#E5DFD3] rounded-md text-sm bg-[#FBF9F4] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DC4C2C]"
              >
                <option value="ALL">{uiLabels.allLangs}</option>
                {LANGUAGES.map(({ code }) => (
                  <option key={code} value={code}>
                    {t.languageNames[code]}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                {uiLabels.yearLabel}
              </label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value as any)}
                className="w-full h-10 px-3 border border-[#E5DFD3] rounded-md text-sm bg-[#FBF9F4] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DC4C2C]"
              >
                <option value="ALL">{uiLabels.allYears}</option>
                <option value="2020_NEWER">{uiLabels.year2020Newer}</option>
                <option value="2010_2019">{uiLabels.year20102019}</option>
                <option value="BEFORE_2010">{uiLabels.yearBefore2010}</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                {uiLabels.availLabel}
              </label>
              <select
                value={availFilter}
                onChange={(e) => setAvailFilter(e.target.value as any)}
                className="w-full h-10 px-3 border border-[#E5DFD3] rounded-md text-sm bg-[#FBF9F4] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DC4C2C]"
              >
                <option value="ALL">{uiLabels.allAvail}</option>
                <option value="AVAILABLE">{uiLabels.availOnly}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header / Result Count */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-600">
            {uiLabels.resultCount}
          </span>
          {(query ||
            langFilter !== "ALL" ||
            yearFilter !== "ALL" ||
            availFilter !== "ALL") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-[#DC4C2C]"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              {uiLabels.clearFiltersBtn}
            </Button>
          )}
        </div>

        {/* Zero Results Error State */}
        {filteredBooks.length === 0 ? (
          <div className="bg-white border border-[#E5DFD3] rounded-xl p-12 text-center space-y-4 my-6">
            <p className="text-lg font-semibold text-gray-700">
              {uiLabels.noResultsMessage}
            </p>
            <Button
              onClick={clearFilters}
              className="bg-[#DC4C2C] hover:bg-[#b83d21] text-white px-6 font-medium"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {uiLabels.clearFiltersBtn}
            </Button>
          </div>
        ) : (
          /* Book Cards Grid */
          <div className="space-y-3">
            {filteredBooks.map((book: Book) => (
              <Card
                key={book.id}
                className="bg-white border-[#E5DFD3] p-4 hover:border-[#DC4C2C]/40 transition-colors shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        to={`/book/${book.id}`}
                        className="text-base font-bold text-gray-900 hover:text-[#DC4C2C] transition-colors"
                      >
                        {book.title}
                      </Link>
                      {/* Language Badge */}
                      <span className="px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded border border-gray-200">
                        {book.language}
                      </span>
                      {/* Year Badge */}
                      <span className="px-2 py-0.5 text-xs font-medium bg-gray-50 text-gray-600 rounded border border-gray-100">
                        {book.year}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Availability Badge */}
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                        book.available
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {book.available
                        ? uiLabels.availableBadge
                        : uiLabels.unavailableBadge}
                    </span>

                    <Link to={`/book/${book.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-[#E5DFD3] hover:text-[#DC4C2C]"
                      >
                        {uiLabels.viewDetails}
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
