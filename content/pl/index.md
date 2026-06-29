---
seo:
  title: EFL Leasing – PHP SDK i integracje ecommerce
  description: Zintegruj leasing i finansowanie w swoim sklepie internetowym dzięki PHP SDK EFL Leasing oraz integracjom dla PrestaShop, WordPress, Shoper i innych platform.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
reverse: false
---
#top
:hero-background

#title
[EFL Leasing]{.text-primary} – PHP SDK i integracje ecommerce

#description
Zintegruj leasing i finansowanie w swoim sklepie internetowym. Użyj naszego PHP SDK do własnych integracji lub wybierz gotową integrację dla swojej platformy ecommerce.

#links
  :::u-button
  ---
  to: /pl/docs
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Rozpocznij
  :::

  :::u-button
  ---
  to: /pl/sdk
  color: neutral
  variant: outline
  size: xl
  icon: i-lucide-package
  ---
  Dokumentacja PHP SDK
  :::

#default
  :::prose-pre
  ---
  code: |
    public function __invoke(): void
    {
        $token = $this->efl->getAuthToken($this->partnerId);
        $positiveUrl = 'https://shop.example.com/efl/return/success';
        $negativeUrl = 'https://shop.example.com/efl/return/failure';

        $redirectUrl = $this->efl->startProcess($positiveUrl, $negativeUrl, $token);
        header('Location: ' . $redirectUrl, true, 302);
        exit;
    }
  filename: StartLeasingController.php
  ---

  ```php [StartLeasingController.php]
  public function __invoke(): void
  {
      $token = $this->efl->getAuthToken($this->partnerId);
      $positiveUrl = 'https://shop.example.com/efl/return/success';
      $negativeUrl = 'https://shop.example.com/efl/return/failure';

      $redirectUrl = $this->efl->startProcess($positiveUrl, $negativeUrl, $token);
      header('Location: ' . $redirectUrl, true, 302);
      exit;
  }
  ```
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Jak zorganizowana jest ta dokumentacja

#description
Ta strona skupia się na dwóch głównych obszarach: PHP SDK do własnych integracji oraz gotowych integracjach ecommerce dla konkretnych platform. Poniższe sekcje pomogą zrozumieć, jak te elementy do siebie pasują.

#features
  :::u-page-feature
  ---
  icon: i-lucide-package
  ---
  #title
  PHP SDK i API

  #description
  Dowiedz się, jak uwierzytelniać się, tworzyć oferty i wnioski, obsługiwać przekierowania i pracować z API EFL Leasing za pomocą PHP SDK.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shopping-cart
  ---
  #title
  Integracje ecommerce

  #description
  Zobacz, jak instalować, konfigurować i aktualizować oficjalne integracje dla PrestaShop, WooCommerce i Shoper oraz jak korzystają z tego samego SDK.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-book-open
  ---
  #title
  Przewodniki i przykłady

  #description
  Postępuj zgodnie z przewodnikami krok po kroku, instrukcjami konfiguracji środowiska i przykładami kodu pokazującymi typowe scenariusze integracji.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
---
orientation: horizontal
---
#title
Obsługiwane platformy

#description
Możesz zacząć od gotowej integracji ecommerce lub zbudować własny przepływ na bazie naszego PHP SDK. Wybierz platformę poniżej, aby otworzyć dedykowaną dokumentację.

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-prestashop
  to: /pl/prestashop-module
  ---
  #title
  Moduł PrestaShop 8+

  #description
  Natywny moduł PrestaShop 8+ dodający EFL Leasing jako metodę płatności w koszyku i na stronach produktów. Konfiguruj limity, warunki i ustawienia wyświetlania bezpośrednio z panelu administracyjnego.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-prestashop
  to: /pl/prestashop17-module
  ---
  #title
  Moduł PrestaShop 1.7

  #description
  Dedykowany moduł PrestaShop 1.7 dla sklepów, które jeszcze nie migrowały. Dodaje EFL Leasing do koszyka i stron produktów z tym samym przepływem leasingowym.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-wordpress
  to: /pl/wordpress-plugin
  ---
  #title
  Wtyczka WordPress / WooCommerce

  #description
  Wtyczka WordPress dla WooCommerce umożliwiająca klientom składanie wniosków o leasing bezpośrednio z koszyka lub strony produktu. Obsługuje różne typy produktów, widżety checkout i własne motywy.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shopping-bag
  to: /pl/shoper-app
  ---
  #title
  Aplikacja Shoper

  #description
  Natywna aplikacja Shoper integrująca EFL Leasing z koszykiem i katalogiem produktów sklepu. Włącz EFL Leasing w kilka kliknięć i zarządzaj konfiguracją z poziomu Shoper.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-code
  to: /pl/sdk
  ---
  #title
  Integracja własna

  #description
  Użyj naszego PHP SDK, aby budować integracje dla dowolnej platformy lub własnego rozwiązania ecommerce – od dedykowanych sklepów po backendy marketplace i wewnętrzne narzędzia sprzedażowe.
  :::
::

::u-page-section{class="dark:bg-gradient-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: Przeglądaj dokumentację
      to: '/pl/docs'
      trailingIcon: i-lucide-arrow-right
    - label: Referencja API PHP SDK
      to: '/pl/sdk'
      variant: subtle
      icon: i-lucide-package
  title: Gotowy do integracji?
  description: Poznaj naszą dokumentację i PHP SDK, aby dodać leasing do swojego sklepu internetowego.
  class: dark:bg-neutral-950
  ---

  :stars-bg
  :::
::
