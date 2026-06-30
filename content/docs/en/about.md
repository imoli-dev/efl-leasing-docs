---
title: About
description: Learn what the EFL Leasing PHP SDK and ecommerce integrations offer and when to use them.
navigation:
  icon: i-lucide-house
---

EFL Leasing helps you add leasing and financing as a payment method to your ecommerce store or custom application.  
This documentation is organised around two main building blocks:

- **PHP SDK** – a PHP SDK for custom integrations and backend services
- **Ecommerce integrations** – ready‑made integrations for popular shop platforms

Use the PHP SDK when you build your own integration or connect multiple sales channels. Use the ecommerce integrations when you just want to enable EFL Leasing quickly on a specific platform without touching the code.

## Where to start

If this is your first time with EFL Leasing, start by deciding how you want to integrate:

- **Use the PHP SDK** when you build your own backend integration or connect multiple sales channels.
- **Use an ecommerce integration** when you want a ready‑made integration for PrestaShop, WooCommerce or Shoper.

In both cases you can configure test credentials, verify the flow in a sandbox environment and then go live with production credentials.

## Documentation areas

::card-group
  :::card
  ---
  icon: i-lucide-package
  title: PHP SDK
  to: /en/sdk
  ---
  Detailed PHP SDK documentation with installation instructions, API reference and advanced topics.
  :::

  :::card
  ---
  icon: i-simple-icons-prestashop
  title: PrestaShop Module
  to: /en/prestashop-module
  ---
  PrestaShop module documentation for 1.7 and 8+ with installation, configuration and usage guides.
  :::

  :::card
  ---
  icon: i-simple-icons-wordpress
  title: WordPress / WooCommerce Plugin
  to: /en/wordpress-plugin
  ---
  WordPress / WooCommerce plugin documentation with setup, configuration and best practices.
  :::

  :::card
  ---
  icon: i-lucide-shopping-bag
  title: Shoper App
  to: /en/shoper-app
  ---
  Shoper application documentation with installation steps, configuration and usage examples.
  :::
::

## Ecommerce integrations

You can integrate EFL Leasing with your store using one of the official integrations:

- **PrestaShop module** – installable from your PrestaShop back office for shops on 1.7 and 8+, adds EFL Leasing as a payment option and on product pages.
- **WordPress / WooCommerce plugin** – ready‑to‑use plugin for WooCommerce‑based shops.
- **Shoper application** – integration for Shoper‑based stores that exposes EFL Leasing in checkout and product views.

All ecommerce integrations are built on top of the same **EFL Leasing PHP SDK**. This means:

- the leasing decision and application flow is consistent across platforms
- you can combine ecommerce integrations with custom SDK integrations in other channels
- monitoring and logging follow the same patterns in your backend systems
