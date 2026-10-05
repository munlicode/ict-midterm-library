/**
 * English — the SOURCE OF TRUTH for all UI strings.
 *
 * Add new keys here first. Other locales are typed against this file and
 * fall back to English for any key they don't define yet.
 *
 * Use `{placeholder}` syntax for dynamic values, then call `format()`.
 */
export const en = {
  common: {
    appName: "UniLib",
  },

  languageNames: {
    EN: "English",
    RU: "Russian",
    KK: "Kazakh",
  },

  nav: {
    sectionLabel: "Navigation",
    home: "Home",
    search: "Search",
    about: "About",
    rules: "Rules",
  },

  header: {
    openMenu: "Toggle menu",
    home: "Home",
    search: "Search",
    signOut: "Sign out",
    toggleLanguage: "Toggle interface language",
  },

  footer: {
    copyright: "UniLib Library Portal Prototype © 2026 ICT Midterm Project",
    expiresIn: "Expires in ~{hours}h",
    expireDemo: "Demo: expire session",
  },

  signIn: {
    subtitle: "Redesigned Library Portal for Students",
    instruction: "Sign in with your university account",
    button: "Sign in with Microsoft",
    signingIn: "Authenticating...",
    publicLinks: "Browse without signing in",
  },

  expired: {
    title: "Session Expired",
    message: "Your session expired. Sign in again.",
    button: "Return to Sign In",
  },

  home: {
    welcome: "Welcome, {name}",
    intro:
      "Access course textbooks, reserve readings, and search the digital catalog.",
    currentReadingsTitle: "Current Readings",
    due: "Due",
    renewDisabled: "Renew (Not in demo)",
    searchPlaceholder: "Search by title, author, or keyword...",
    searchButton: "Search Catalog",
  },

  about: {
    title: "About",
    body: "Here you can find information about library, including open-hours, contact information and location of the library.",
    hoursTitle: "Library Working Hours",
    hoursBody: "Mon - Fri: 9:00 - 10:00 | Sat: 10:00 - 16:00",
    helpTitle: "Ask a Librarian",
    locationTitle: "Location",
    locationBody: "The left side of C1.1 block.",
    helpBody:
      "Need assistance finding course reserves or thesis materials? Visit the Information Desk",
    tipTitle: "Helpful Tip!",
    tipBody: "Don't forget to bring your identification ID to borrow a book!",
    foodTitle: "",
    foodBody: "",
    quietTitle: "",
    quietBody: "",
  },
  rules: {
    title: "Rules",
    body: "Be polite to the library staff and other users.",
    foodTitle: "Food & Drinks",
    foodBody:
      "Only covered drinks and light snacks are allowed in designated areas.",
    quietTitle: "Quiet Zone",
    quietBody: "Keep noise to a minimum and set devices to silent mode.",
  },

  search: {
    title: "Extended Book Search",
    searchLabel: "Keywords",
    searchPlaceholder: "Title or author...",
    langLabel: "Language",
    yearLabel: "Publication Year",
    availLabel: "Availability",
    allLangs: "All Languages",
    allYears: "All Years",
    year2020Newer: "2020 and newer",
    year20102019: "2010 – 2019",
    yearBefore2010: "Before 2010",
    allAvail: "All Books",
    availOnly: "Available Now Only",
    resultCountOne: "{count} result found",
    resultCountMany: "{count} results found",
    noResultsMessage: "No results. Try fewer filters.",
    clearFiltersBtn: "Clear filters",
    viewDetails: "View book details",
    availableBadge: "Available now",
    unavailableBadge: "Unavailable",
  },

  book: {
    backToSearch: "Back to Search",
    notFound: "Book not found",
    notFoundDesc:
      "The requested book ID does not exist in our library catalog.",
    permalinkLabel: "Permanent link to this page",
    copyLink: "Copy link",
    copied: "Copied!",
    linkCopied: "Link copied to clipboard!",
    reserveBtn: "Reserve Book",
    reserveDisabledTooltip: "Not in prototype",
    authorLabel: "Author",
    langLabel: "Language",
    yearLabel: "Publication Year",
    catalogId: "Catalog ID",
    availLabel: "Availability",
    available: "Available now",
    unavailable: "Currently checked out",
    descLabel: "Description",
  },
};
