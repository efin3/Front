import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      Access: 'Access',
      'Add to Cart': 'Add to Cart',
      'All Categories': 'All categories',
      'All Tutors': 'All tutors',
      'Attend to Course': 'Attend to Course',
      Authentication: 'Authentication',
      Back: 'Back',
      'Back to website': 'Back to website',
      'Buy Course': 'Buy Course',
      'Buy now': 'Buy now',
      Categories: 'Categories',
      Category: 'Category',
      'change font size': 'change font size',
      Confirm: 'Confirm',
      'Contact Us': 'Contact Us',
      'Course Preview': 'Course Preview',
      'Course Program': 'Course Program',
      Courses: 'Courses',
      DateAdded: 'Date added',
      Description: 'Description',
      Duration: 'Duration',
      Found: 'We found',
      FoundCourses_one: 'We found <strong>{{count}}</strong> course available for you',
      FoundCourses_other: 'We found <strong>{{count}}</strong> courses available for you',
      FREE: 'FREE',
      H5P: 'Interactive element',
      Home: 'Home',
      Image: 'Image',
      Language: 'Language',
      'Last Updated': 'Last Updated',
      Lesson_one: 'Lesson',
      Lesson_other: 'Lessons',
      LessonSummary: 'Lesson summary',
      Level: 'Level',
      Lifetime: 'Lifetime',
      LogIn: 'Log In',
      Login: 'Login',
      'Login to buy': 'Login to buy',
      'Meet your instructor': 'Meet your instructor',
      'next topic': 'next topic',
      'Next Topic': 'Next topic',
      next: 'Next',
      NoCourses: 'No courses found',
      NoCoursesYet: 'You have no courses yet. Find one on ',
      OEmbed: 'Inserted Element',
      Pages: 'Pages',
      Password: 'Password',
      playVideo: 'Play video',
      'Popular Tags': 'Popular Tags',
      'prev topic': 'prev topic',
      prev: 'Prev',
      'Preview course for free': 'Preview course for free',
      Preview: 'Preview',
      'Price: high to low': 'Price: high to low',
      'Price: low to high': 'Price: low to high',
      RecentCourses: 'Recent courses',
      Register: 'Register',
      RichText: 'Text',
      'Search for': 'Search for',
      Search: 'Search',
      Send: 'Send',
      SortBy: 'Sort by',
      Student_one: 'Student',
      Student_other: 'Students',
      StudentsEnrolled: 'Students Enrolled',
      Summary: 'Summary',
      Tags: 'Tags',
      Title: 'Title',
      Topic_one: 'Topic',
      Topic_other: 'Topics',
      TopicSummary: 'Topic summary',
      Tutor: 'Tutor',
      Tutors: 'Tutors',
      Video: 'Video',
      CoursePreviewNavbar: 'This is course preview. Back to app, or purchase this course.',
      Cart: {
        Cart: 'Cart',
        PayWithStripe: 'Pay with stripe Checkout',
        FreeCheckout: 'Free Checkout',
        CartIsEmpty: 'Cart is empty',
        CartSummary: 'Cart Totals',
        Columns: {
          Product: 'Product',
          Name: 'Name',
          Price: 'Price',
          Remove: 'Remove',
        },
      },
      ContactPage: {
        Ready: 'Ready to Get Started?',
        EmailInfo: 'Your email address will not be published. Required fields are marked *',
        Name: 'Your Name',
        Email: 'Your email address',
        Phone: 'Your phone number',
        Subject: 'Your Subject',
        Message: 'Write your message...',
        Send: 'Send Message',
        OurAdress: 'Our Address',
        Contact: 'Contact',
        Hours: 'Hours of Operation',
        InTouch: 'Get in Touch',
        Details: 'Contact Details',
        Mobile: 'Mobile',
      },
      CourseProgram: {
        TopicAttachment: 'Topic attachments',
      },
      EmailVerifiedPage: {
        Verified: 'Your email is now verified',
        EmailText: 'Your email is now verified. Go to',
        LoginPage: 'login page',
      },
      Homepage: {
        heading: 'Digital Wellbeing',
        headingText: `Modern information and communication technologies have changed the way we live and function forever. Learn how to take control of them to reach their full potential. It's up to you to have power over them, not over you.`,
        joinFree: 'Join For Free',
        headingText2: 'Improve Yours Skills With EscolaLMS Any Time, Anywhere',
      },
      LoginPage: {
        RememberMe: 'Remember me',
        Lost: 'Lost your password?',
        Reset: 'Reset your password',
        TempLogin: 'For this demo you can use the following credentials',
        Username: 'Username',
        TempEmail1: 'This demo is using fake email service',
        TempEmail2: 'Use the following credentials to check what emails are being sent.',
        ForgotSuccess: 'We send a email for password reset',
      },
      MyCoursesPage: {
        Finish: 'Finish the course you started',
        Available: 'Available courses',
        Finished: 'Completed courses',
      },
      MyProfilePage: {
        Avatar: 'Select file to replace Avatar',
        FirstName: 'First Name',
        LastName: 'Last Name',
        Update: 'Update',
      },
      Navbar: {
        MyProfile: 'My Profile',
        MyCourses: 'My Courses',
        MyOrders: 'My Orders',
        MyPayments: 'My Payments',
        Logout: 'Logout',
      },
      OrdersPage: {
        MyOrders: 'My Orders',
        Price: {
          Subtotal: 'Subtotal',
          Tax: 'Tax',
          Total: 'Total',
        },
      },
      PaymentsPage: {
        MyPayments: 'My payments',
        TableCols: {
          OrderId: 'ORDER ID',
          PaymentId: 'PAYMENT ID',
          Created: 'CREATED',
          Price: 'PRICE',
          Items: 'Items',
        },
        PaymentStatus: {
          new: 'New',
          paid: 'Paid',
        },
      },
      RegisterPage: {
        FullName: 'First Name',
        LastName: 'Last Name',
        PassInfo:
          ' The password should be at least eight characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ & )',
      },
      ResetPage: {
        Set: 'Set new password',
        NewPass: 'New password',
        Reset: 'Reset',
        Changed: 'Password has been changed',
      },
      StaticPages: {
        Contact: 'Contact',
      },
    },
  },
  pl: {
    translation: {
      Access: 'Dostęp',
      'Add to Cart': 'Dodaj do koszyka',
      'All Categories': 'Wszystkie kategorie',
      'All Tutors': 'Wszyscy Instruktorzy',
      'Attend to Course': 'Uruchom kurs',
      Authentication: 'Uwierzytelnianie',
      Back: 'Wróć',
      'Back to website': 'Wróć do strony głównej',
      'Buy Course': 'Kup kurs',
      'Buy now': 'Kup teraz',
      Categories: 'Kategorie',
      Category: 'Kategoria',
      'change font size': 'zmień wielkość tekstu',
      Confirm: 'Potwierdź',
      'Contact Us': 'Kontakt',
      'Course Preview': 'Zajawka Kursu',
      'Course Program': 'Program Kursu',
      Courses: 'Kursy',
      DateAdded: 'Data dodania',
      Description: 'Opis',
      Duration: 'Czas Trwania',
      Found: 'Znaleźliśmy',
      FoundCourses_few: 'Znaleźliśmy <strong>{{count}}</strong> kursy dostępne dla Ciebie',
      FoundCourses_many: 'Znaleźliśmy <strong>{{count}}</strong> kursów dostępnych dla Ciebie',
      FoundCourses_one: 'Znaleźliśmy <strong>{{count}}</strong> kurs dostępny dla Ciebie',
      FREE: 'DARMOWY',
      H5P: 'Element interaktywny',
      Home: 'Strona główna',
      Image: 'Obraz',
      Language: 'Język',
      'Last Updated': 'Ostatnia aktualizacja',
      Lesson_few: 'Lekcje',
      Lesson_many: 'Lekcji',
      Lesson_one: 'Lekcja',
      LessonSummary: 'Podsumowanie lekcji',
      Level: 'Poziom',
      Lifetime: 'Dożywotni',
      Login: 'Logowanie',
      LogIn: 'Zaloguj się',
      'Login to buy': 'Zaloguj się by kupić',
      'Meet your instructor': 'Poznaj swojego nauczyciela',
      'Next Topic': 'Następna lekcja',
      'next topic': 'następny moduł',
      next: 'Następny',
      NoCourses: 'Nie znaleziono kursów',
      NoCoursesYet: 'Nie masz kursów. Znajdź je na ',
      OEmbed: 'Element wstawiony',
      Pages: 'Strony',
      Password: 'Hasło',
      playVideo: 'Odtwórz wideo',
      'Popular Tags': 'Popularne tagi',
      'prev topic': 'poprzedni moduł',
      prev: 'Poprzedni',
      'Preview course for free': 'Podgląd kursu za darmo',
      Preview: 'Podgląd',
      'Price: high to low': 'Cena: od najniższej',
      'Price: low to high': 'Cena: od najwyższej',
      RecentCourses: 'Ostatnie kursy',
      Register: 'Rejestracja',
      RichText: 'Tekst',
      'Search for': 'Szukaj',
      Search: 'Szukaj',
      Send: 'Wyślij',
      SortBy: 'Sortuj według',
      Student_few: 'Studentów',
      Student_many: 'Studentów',
      Student_one: 'Student',
      StudentsEnrolled: 'Ilość słuchaczy',
      Summary: 'Konspekt Kursu',
      Tags: 'Tagi',
      Title: 'Tytuł',
      Topic_few: 'Tematy',
      Topic_many: 'Tematów',
      Topic_one: 'Temat',
      TopicSummary: 'Podsumowanie tematu',
      Tutor: 'Instruktor',
      Tutors: 'Instruktorzy',
      Video: 'Wideo',
      CoursePreviewNavbar: 'To jest podgląd kursu. Wróć do aplikacji, lub kup ten kurs.',

      Cart: {
        Cart: 'Koszyk',
        PayWithStripe: 'Płać za pomocą stripe Checkout',
        FreeCheckout: 'Zakończ bezpłatnie',
        CartIsEmpty: 'Koszyk jest pusty',
        CartSummary: 'Suma koszyka',
        Columns: {
          Product: 'Produkt',
          Name: 'Nazwa',
          Price: 'Cena',
          Remove: 'Usuń',
        },
      },
      ContactPage: {
        Ready: 'Gotowy żeby zacząć?',
        EmailInfo: 'Twoj adres e-mail nie bedzie opublikowany. Wymagane pola są zaznaczone *',
        Name: 'Twoje imię',
        Email: 'Twój adres email',
        Phone: 'Twój numer telefonu',
        Subject: 'Twój temat',
        Message: 'Napisz wiadomość...',
        Send: 'Wyślij wiadomość',
        OurAdress: 'Nasz adress',
        Contact: 'Kontakt',
        Hours: 'Godziny',
        InTouch: 'Bądź w kontakcie',
        Details: 'Szczegóły kontaktu',
        Mobile: 'Telefon',
      },
      CourseProgram: {
        TopicAttachment: 'Załączniki lekcji',
      },
      EmailVerifiedPage: {
        Verified: 'Twój email jest teraz zweryfikowany',
        EmailText: 'Twój email został zweryfikowany. Przejdź do',
        LoginPage: 'strony logowania',
      },
      Homepage: {
        heading: 'Cyfrowy Dobrostan',
        headingText: `Nowoczesne technologie informacyjno-komunikacyjne na zawsze
        zmieniły sposób, w jaki żyjemy i funkcjonujemy. Naucz się, jak
        przejąć nad nimi kontrolę, aby w pełni wykorzystać ich
        potencjał. To Ty masz mieć nad nimi władzę, a nie one nad Tobą.`,
        joinFree: 'Dołącz bezpłatnie',
        headingText2: 'Podnieś swoje umiejętności dzięki EscolaLMS w dowolnym czasie i miejscu',
      },
      LoginPage: {
        RememberMe: 'Zapamietaj mnie',
        Lost: 'Zapomniałeś hasła?',
        Reset: 'Zresetuj swoje hasło',
        TempLogin: 'W tym demo możesz użyć następujących danych uwierzytelniających',
        Username: 'Nazwa użytkownika',
        TempEmail1: 'To demo używa fałszywej usługi e-mail.',
        TempEmail2:
          'Użyj poniższych danych uwierzytelniających, aby sprawdzić, jakie e-maile są wysyłane',
        ForgotSuccess: 'Wysłaliśmy wiadomość e-mail z prośbą o zresetowanie hasła',
      },
      MyCoursesPage: {
        Finish: 'Dokończ rozpoczęty kurs',
        Available: 'Dostępne kursy',
        Finished: 'Ukończone kursy',
      },
      MyProfilePage: {
        Avatar: 'Wybierz plik do Avatara',
        FirstName: 'Imię',
        LastName: 'Nazwisko',
        Update: 'Zaktualizuj',
      },
      Navbar: {
        MyProfile: 'Mój Profil',
        MyCourses: 'Moje Kursy',
        MyOrders: 'Moje zamówienia',
        MyPayments: 'Płatności',
        Logout: 'Wyloguj',
      },
      OrdersPage: {
        MyOrders: 'Moje zamówienia',
        Price: {
          Subtotal: 'Suma',
          Tax: 'Podatek',
          Total: 'Koszt całkowity',
        },
      },
      PaymentsPage: {
        MyPayments: 'Moje płatności',
        TableCols: {
          OrderId: 'ID ZAMÓWIENIA',
          PaymentId: 'ID Płatności',
          Created: 'Utworzono',
          Price: 'Cena',
          Items: 'Kursy',
        },
        PaymentStatus: {
          new: 'Nowe',
          paid: 'Opłacone',
        },
      },
      RegisterPage: {
        FullName: 'Imię',
        LastName: 'Nazwisko',
        PassInfo:
          'Hasło powinno składać się z co najmniej ośmiu znaków. Aby je wzmocnić, użyj wielkich i małych liter, cyfr i symboli, takich jak ! " ? $ % ^ & )',
      },
      ResetPage: {
        Set: 'Ustaw nowe hasło',
        NewPass: 'Nowe hasło',
        Reset: 'Resetuj',
        Changed: 'Hasło zostało zmienione',
      },
      StaticPages: {
        Contact: 'Kontakt',
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    supportedLngs: ['pl', 'en'],
    fallbackLng: 'pl',
    // lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },
  });

export default i18n;
