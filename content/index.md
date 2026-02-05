---
seo:
  title: EFL Leasing – PHP SDK & Ecommerce Integrations
  description: Integrate leasing and financing into your ecommerce store with EFL Leasing PHP SDK and plugins for PrestaShop, WordPress, and more.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
reverse: false
---
#top
:hero-background

#title
[EFL Leasing]{.text-primary} – PHP SDK & Ecommerce Plugins

#description
Integrate leasing and financing into your online store. Use our PHP SDK for custom integrations or choose a ready-made plugin for your ecommerce platform.

#links
  :::u-button
  ---
  to: /docs
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  to: /sdk
  color: neutral
  variant: outline
  size: xl
  icon: i-lucide-package
  ---
  PHP SDK Documentation
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
How this documentation is organised

#description
This site focuses on two main areas: the PHP SDK for custom integrations and ready‑made ecommerce plugins for specific platforms. Use the sections below to understand how the pieces fit together.

#features
  :::u-page-feature
  ---
  icon: i-lucide-package
  ---
  #title
  PHP SDK and API

  #description
  Learn how to authenticate, create offers and applications, handle redirects and work with the EFL Leasing API using the PHP SDK.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shopping-cart
  ---
  #title
  Ecommerce integrations

  #description
  See how to install, configure and update official plugins for PrestaShop, WooCommerce and Shoper, and how they use the same SDK under the hood.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-book-open
  ---
  #title
  Guides and examples

  #description
  Follow step‑by‑step guides, environment setup instructions and code examples that show common integration scenarios in real applications.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
---
orientation: horizontal
---
#title
Platform support

#description
You can start with a ready-made ecommerce integration or build a custom flow on top of our PHP SDK. Pick your platform below to open the dedicated documentation.

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-prestashop
  to: /prestashop-module
  ---
  #title
  PrestaShop Module

  #description
  Native PrestaShop module that adds EFL Leasing as a payment method in your checkout and product pages. Configure limits, terms and display settings directly from your back office.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-wordpress
  to: /wordpress-plugin
  ---
  #title
  WordPress / WooCommerce Plugin

  #description
  WordPress plugin for WooCommerce that lets customers apply for leasing directly from the cart or product page. Supports multiple product types, checkout widgets and custom themes.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shopping-bag
  to: /shoper-app
  ---
  #title
  Shoper App

  #description
  Native Shoper application that integrates EFL Leasing with your store’s checkout and product catalogue. Enable EFL Leasing in a few clicks and manage configuration from the Shoper.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-code
  to: /sdk
  ---
  #title
  Custom Integration

  #description
  Use our PHP SDK to build integrations for any platform or custom ecommerce solution – from bespoke storefronts to marketplace backends and internal sales tools.
  :::
::

::u-page-section{class="dark:bg-gradient-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: Browse documentation
      to: '/docs'
      trailingIcon: i-lucide-arrow-right
    - label: PHP SDK API Reference
      to: '/sdk'
      variant: subtle
      icon: i-lucide-package
  title: Ready to integrate?
  description: Explore our documentation and PHP SDK to add leasing to your ecommerce store.
  class: dark:bg-neutral-950
  ---

  :stars-bg
  :::
::
