---
title: O dokumentacji
description: Dowiedz się, co oferuje PHP SDK EFL Leasing oraz integracje ecommerce i kiedy z nich korzystać.
navigation:
  icon: i-lucide-house
---

EFL Leasing pomaga dodać leasing i finansowanie jako metodę płatności w sklepie internetowym lub własnej aplikacji.  
Ta dokumentacja jest zorganizowana wokół dwóch głównych elementów:

- **PHP SDK** – biblioteka PHP do własnych integracji i usług backendowych
- **Integracje ecommerce** – gotowe moduły dla popularnych platform sklepowych

Używaj PHP SDK, gdy budujesz własną integrację lub łączysz wiele kanałów sprzedaży. Wybierz wtyczki ecommerce, gdy chcesz szybko włączyć EFL Leasing na konkretnej platformie bez pisania kodu.

## Od czego zacząć

Jeśli dopiero zaczynasz z EFL Leasing, najpierw zdecyduj, jak chcesz integrować:

- **Użyj PHP SDK**, gdy budujesz własną integrację backendową lub łączysz wiele kanałów sprzedaży.
- **Użyj integracji ecommerce**, gdy potrzebujesz gotowej wtyczki dla PrestaShop, WooCommerce lub Shoper.

W obu przypadkach możesz skonfigurować dane testowe, zweryfikować przepływ w środowisku sandbox, a następnie przejść na produkcję.

## Obszary dokumentacji

::card-group
  :::card
  ---
  icon: i-lucide-package
  title: PHP SDK
  to: /pl/sdk
  ---
  Szczegółowa dokumentacja PHP SDK z instrukcjami instalacji, referencją API i zaawansowanymi tematami.
  :::

  :::card
  ---
  icon: i-simple-icons-prestashop
  title: Moduł PrestaShop
  to: /pl/prestashop-module
  ---
  Dokumentacja modułu PrestaShop z przewodnikami instalacji, konfiguracji i użytkowania.
  :::

  :::card
  ---
  icon: i-simple-icons-wordpress
  title: Wtyczka WordPress / WooCommerce
  to: /pl/wordpress-plugin
  ---
  Dokumentacja wtyczki WordPress / WooCommerce z konfiguracją i najlepszymi praktykami.
  :::

  :::card
  ---
  icon: i-lucide-shopping-bag
  title: Aplikacja Shoper
  to: /pl/shoper-app
  ---
  Dokumentacja aplikacji Shoper z krokami instalacji, konfiguracji i przykładami użycia.
  :::
::

## Integracje ecommerce

EFL Leasing możesz zintegrować ze sklepem za pomocą jednej z oficjalnych wtyczek:

- **Moduł PrestaShop** – instalowany z panelu PrestaShop, dodaje EFL Leasing jako metodę płatności i na stronach produktów.
- **Wtyczka WordPress / WooCommerce** – gotowe rozwiązanie dla sklepów opartych o WooCommerce.
- **Aplikacja Shoper** – integracja dla sklepów Shoper z obsługą checkout i widoków produktów.

Wszystkie integracje ecommerce opierają się na tym samym **PHP SDK EFL Leasing**. Oznacza to, że:

- przepływ decyzji i wniosku leasingowego jest spójny między platformami
- możesz łączyć wtyczki z własnymi integracjami SDK w innych kanałach
- monitorowanie i logowanie działają według tych samych wzorców w systemach backendowych
