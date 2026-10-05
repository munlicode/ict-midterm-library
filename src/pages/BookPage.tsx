import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { useTranslation, LANGUAGES } from "../i18n";
import { BOOKS } from "../data/books";

export const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const book = BOOKS.find((b) => b.id === id);

  const permalink = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(permalink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const labels = t.book;

  if (!book) {
    return (
      <div className="flex flex-col flex-1">
        <div className="flex-1 max-w-240 w-full mx-auto px-6 py-12">
          <Link
            to="/search"
            className="inline-flex items-center text-sm font-semibold text-[#DC4C2C] hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {labels.backToSearch}
          </Link>
          <div className="bg-white border border-[#E5DFD3] rounded-xl p-8 text-center space-y-3">
            <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold text-gray-800">
              {labels.notFound}
            </h2>
            <p className="text-sm text-gray-600">{labels.notFoundDesc}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 max-w-240 w-full mx-auto px-6 py-8">
        {/* Back Link */}
        <Link
          to="/search"
          className="inline-flex items-center text-sm font-semibold text-gray-700 hover:text-[#DC4C2C] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          {labels.backToSearch}
        </Link>

        {/* Main Book Detail Card */}
        <Card className="bg-white border-[#E5DFD3] p-8 shadow-xs space-y-6">
          <CardHeader className="p-0 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-extrabold text-[#2D2D2D] leading-tight">
                  {book.title}
                </CardTitle>
                <p className="text-lg text-gray-700 font-medium mt-1">
                  {book.author}
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full border shrink-0 ${
                  book.available
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {book.available ? labels.available : labels.unavailable}
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-6 divide-y divide-gray-100">
            {/* Attributes Table / Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {labels.langLabel}
                </span>
                <span className="text-sm font-semibold text-gray-800 mt-1 block">
                  {LANGUAGES.find((l) => l.code === book.language)?.nativeName}{" "}
                  ({book.language})
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {labels.yearLabel}
                </span>
                <span className="text-sm font-semibold text-gray-800 mt-1 block">
                  {book.year}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {labels.catalogId}
                </span>
                <span className="text-sm font-mono font-semibold text-gray-800 mt-1 block">
                  #{book.id}
                </span>
              </div>
            </div>

            {/* Description (2 lines requirement fulfilled with prose) */}
            <div className="pt-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {labels.descLabel}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
                {book.description}
              </p>
            </div>

            {/* Permanent Link Section */}
            <div className="pt-6 space-y-2">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {labels.permalinkLabel}
              </label>
              <div className="flex gap-2 items-center max-w-xl">
                <Input
                  type="text"
                  readOnly
                  value={permalink}
                  className="bg-gray-50 border-[#E5DFD3] text-xs font-mono text-gray-600 h-10 select-all"
                />
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="shrink-0 h-10 border-[#E5DFD3] hover:border-[#DC4C2C] text-xs font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                      {labels.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      {labels.copyLink}
                    </>
                  )}
                </Button>
              </div>

              {/* Link Copied Toast/Alert Notification */}
              {copied && (
                <div className="mt-2 inline-flex items-center text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
                  <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                  {labels.linkCopied}
                </div>
              )}
            </div>

            {/* Action Section (Reserve Disabled) */}
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative group">
                <Button
                  disabled
                  className="bg-gray-200 text-gray-400 font-semibold px-6 h-11 border border-gray-300 cursor-not-allowed"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {labels.reserveBtn}
                </Button>
              </div>
              <span className="text-xs text-gray-500 font-medium bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                ⚠️ {labels.reserveDisabledTooltip}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
