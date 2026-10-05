import type { PartialTranslations } from "../types";

export const ru: PartialTranslations = {
  languageNames: {
    EN: "Английский",
    RU: "Русский",
    KK: "Казахский",
  },

  nav: {
    sectionLabel: "Навигация",
    home: "Главная",
    search: "Поиск",
    about: "О нас",
  },

  header: {
    openMenu: "Меню",
    home: "Главная",
    search: "Поиск",
    signOut: "Выйти",
    toggleLanguage: "Сменить язык интерфейса",
  },

  footer: {
    expiresIn: "Истекает через ~{hours} ч",
    expireDemo: "Демо: завершить сеанс",
  },

  signIn: {
    subtitle: "Обновленный библиотечный портал для студентов",
    instruction: "Войдите с помощью вашей университетской учетной записи",
    button: "Войти через Microsoft",
    signingIn: "Аутентификация...",
  },

  expired: {
    title: "Сеанс завершен",
    message: "Срок действия вашего сеанса истек. Войдите снова.",
    button: "Вернуться на страницу входа",
  },

  home: {
    welcome: "Добро пожаловать, {name}",
    intro: "Доступ к учебникам, бронированию и поиску в электронном каталоге.",
    currentReadingsTitle: "Текущие книги на руках",
    due: "Срок возврата",
    renewDisabled: "Продлить (НЕДОСТУПНО)",
    searchPlaceholder: "Поиск по названию, автору или ключевому слову...",
    searchButton: "Найти в каталоге",
  },
  about: {
    title: "О библиотеке",
    body: "Здесь вы можете найти информацию о библиотеке, включая часы работы, контактные данные и ее расположение.",
    hoursTitle: "График работы библиотеки",
    hoursBody: "Пн – Пт: 9:00 – 10:00 | Сб: 10:00 – 16:00",
    helpTitle: "Спросить библиотекаря",
    locationTitle: "Расположение",
    locationBody: "Левое крыло блока C1.1.",
    helpBody:
      "Нужна помощь с поиском учебных резервов или материалов дипломных работ? Обратитесь на стойку информации (Information Desk)",
    tipTitle: "Полезный совет!",
    tipBody:
      "Не забудьте взять с собой удостоверение личности (ID), чтобы взять книгу!",
  },
  search: {
    title: "Расширенный поиск книг",
    searchLabel: "Ключевые слова",
    searchPlaceholder: "Название или автор...",
    langLabel: "Язык",
    yearLabel: "Год издания",
    availLabel: "Доступность",
    allLangs: "Все языки",
    allYears: "Все года",
    year2020Newer: "2020 и новее",
    year20102019: "2010 – 2019",
    yearBefore2010: "До 2010",
    allAvail: "Все книги",
    availOnly: "Только в наличии",
    resultCountOne: "Найдено результатов: {count}",
    resultCountMany: "Найдено результатов: {count}",
    noResultsMessage: "Ничего не найдено. Попробуйте сбросить фильтры.",
    clearFiltersBtn: "Сбросить фильтры",
    viewDetails: "Подробнее",
    availableBadge: "В наличии",
    unavailableBadge: "Выдана",
  },

  book: {
    backToSearch: "Назад к поиску",
    notFound: "Книга не найдена",
    notFoundDesc: "Запрошенный ID книги отсутствует в каталоге библиотеки.",
    permalinkLabel: "Постоянная ссылка на страницу",
    copyLink: "Копировать ссылку",
    copied: "Скопировано!",
    linkCopied: "Ссылка скопирована!",
    reserveBtn: "Забронировать книгу",
    reserveDisabledTooltip: "Не входит в прототип",
    authorLabel: "Автор",
    langLabel: "Язык",
    yearLabel: "Год издания",
    catalogId: "ID в каталоге",
    availLabel: "Доступность",
    available: "В наличии",
    unavailable: "Выдана на руки",
    descLabel: "Описание",
  },
};
