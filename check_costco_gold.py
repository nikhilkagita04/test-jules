#!/usr/bin/env python3
"""
Costco Gold Bar Stock Checker
──────────────────────────────
Monitors Costco.com every 15 min for 1oz gold bars and fires a push
notification the moment one is available for online delivery.

HOW TO BUY WHEN ALERTED:
  1. Go to costco.com (NOT the app)
  2. Search for the product or use the link in the notification
  3. Click Add to Cart directly — do NOT select a warehouse
     (Gold is online delivery only, warehouse pickup doesn't apply)
  4. Checkout with your delivery address (08820 / NJ)

Notification: ntfy.sh (free push notification app)
  → Install "ntfy" app on your phone
  → Subscribe to topic: costcogold-8482562090
"""

import sys
import time
import random
import requests
from datetime import datetime, timezone

# ── ntfy push notification topic ─────────────────────────────────────────────
NTFY_TOPIC = "costcogold-8482562090"

# ── All 1oz gold bars on Costco (updated April 2026) ─────────────────────────
# Costco sells MANY PAMP Suisse designs — monitoring all of them
# maximises the chance of catching any restock event.
PRODUCTS = [
    # ── Lady Fortuna (main listing) ──────────────────────────────────────────
    {
        "name": "1oz PAMP Suisse Lady Fortuna Veriscan (A)",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-lady-fortuna-veriscan-new-in-assay.product.4000186760.html",
    },
    {
        "name": "1oz PAMP Suisse Lady Fortuna Veriscan (B)",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-lady-fortuna-veriscan-new-in-assay.product.4000363990.html",
    },
    # ── Other PAMP Suisse 1oz designs ────────────────────────────────────────
    {
        "name": "1oz PAMP Suisse Lady of Justice",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-lady-of-justice-new-in-assay.product.4000416620.html",
    },
    {
        "name": "1oz PAMP Suisse Lady of Liberty",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-lady-of-liberty-new-in-assay.product.4000374145.html",
    },
    {
        "name": "1oz PAMP Suisse Good Luck Yellow Dragon",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-good-luck-yellow-dragon-new-in-assay.product.4000375430.html",
    },
    {
        "name": "1oz PAMP Suisse Yellowstone Cowboy",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-yellowstone-cowboy-new-in-assay.product.4000416264.html",
    },
    {
        "name": "1oz PAMP Suisse Lunar Legends White Snake",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-lunar-legends-white-snake.product.4000298063.html",
    },
    {
        "name": "1oz PAMP Suisse Diwali Lakshmi (A)",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-diwali-lakshmi-new-in-assay.product.4000378389.html",
    },
    {
        "name": "1oz PAMP Suisse Diwali Lakshmi (B)",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-diwali-lakshmi.product.4000300302.html",
    },
    # ── Rand Refinery ────────────────────────────────────────────────────────
    {
        "name": "1oz Rand Refinery Gold Bar",
        "url": "https://www.costco.com/1-oz-gold-bar-rand-refinery-new-in-assay.product.4000202779.html",
    },
    # ── 100g bars ────────────────────────────────────────────────────────────
    {
        "name": "100g PAMP Suisse Lady Fortuna",
        "url": "https://www.costco.com/100-gram-gold-bar-pamp-suisse-lady-fortuna-veriscan-new-in-assay.product.4000239966.html",
    },
    {
        "name": "100g Valcambi Combibar",
        "url": "https://www.costco.com/100-gram-gold-valcambi-combibar-new-in-assay.product.4000422320.html",
    },
]

# ── Rotate user-agent strings to reduce bot detection ────────────────────────
USER_AGENTS = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
]


def make_headers() -> dict:
    return {
        "User-Agent": random.choice(USER_AGENTS),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
    }


# ── Stock detection ───────────────────────────────────────────────────────────

def check_stock(product: dict) -> tuple[bool | None, str]:
    """
    Returns (in_stock, status_message).
      True  = confirmed in stock for online delivery
      False = confirmed out of stock / unavailable
      None  = blocked by Akamai / timeout / error
    """
    try:
        # Small random delay so requests don't look machine-generated
        time.sleep(random.uniform(1.5, 3.5))

        resp = requests.get(
            product["url"],
            headers=make_headers(),
            timeout=30,
            allow_redirects=True,
        )

        if resp.status_code == 403:
            return None, "Blocked by Akamai (403) — try again next cycle"
        if resp.status_code != 200:
            return None, f"HTTP {resp.status_code}"

        low = resp.text.lower()

        # ── Signals that item IS available for online delivery ────────────
        in_stock_signals = [
            '"availability":"instock"',
            '"instock"',
            "add to cart",
            '"deliveryavailable":true',
            "delivery available",
        ]
        # ── Signals that item is NOT available ────────────────────────────
        out_of_stock_signals = [
            "sold out",
            "out of stock",
            '"availability":"outofstock"',
            '"outofstock"',
            "currently unavailable",
            "not available in the zip",
            "check back again later",
        ]

        for signal in out_of_stock_signals:
            if signal in low:
                return False, f'Out of stock ("{signal}" found)'

        for signal in in_stock_signals:
            if signal in low:
                # Extra check: make sure it's not immediately followed by sold-out text
                if "sold out" not in low and "out of stock" not in low:
                    return True, f'In Stock ("{signal}" detected)'

        return False, "No clear availability signal found"

    except requests.Timeout:
        return None, "Timeout (30s)"
    except Exception as exc:
        return None, f"Error: {exc}"


# ── Push notification ─────────────────────────────────────────────────────────

def send_notification(title: str, body: str, url: str = "") -> bool:
    try:
        headers = {
            "Title":    title,
            "Priority": "urgent",
            "Tags":     "rotating_light,moneybag",
        }
        if url:
            headers["Click"] = url
        resp = requests.post(
            f"https://ntfy.sh/{NTFY_TOPIC}",
            data=body.encode("utf-8"),
            headers=headers,
            timeout=15,
        )
        ok = resp.status_code == 200
        print(f"  {'✅' if ok else '❌'} ntfy {'sent' if ok else f'failed HTTP {resp.status_code}'}")
        return ok
    except Exception as exc:
        print(f"  ❌ ntfy error: {exc}")
        return False


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    print(f"\n{'═' * 60}")
    print(f"  🥇 Costco Gold Checker  |  {now}")
    print(f"  Watching {len(PRODUCTS)} products")
    print(f"{'═' * 60}")

    in_stock_items   = []
    blocked_count    = 0

    for product in PRODUCTS:
        print(f"\n  ▶  {product['name']}")
        in_stock, status = check_stock(product)

        if in_stock is True:
            print(f"     ✅  {status}")
            in_stock_items.append(product)
        elif in_stock is False:
            print(f"     ❌  {status}")
        else:
            print(f"     ⚠️   {status}")
            blocked_count += 1

    print(f"\n{'─' * 60}")
    print(f"  Results: {len(in_stock_items)} in stock | {blocked_count} blocked | "
          f"{len(PRODUCTS) - len(in_stock_items) - blocked_count} out of stock")

    if in_stock_items:
        print(f"\n  🚨 IN STOCK FOUND! Sending push notification …")
        for item in in_stock_items:
            send_notification(
                title="🚨 COSTCO GOLD IN STOCK — BUY NOW!",
                body=(
                    f"{item['name']}\n\n"
                    f"Go to costco.com (NOT the app)\n"
                    f"Tap to open → Add to Cart directly\n"
                    f"Do NOT select warehouse — just checkout!\n\n"
                    f"Checked: {now}"
                ),
                url=item["url"],
            )
    elif blocked_count == len(PRODUCTS):
        print("  ⚠️  All requests blocked by Akamai this cycle — no data.")
        print("      Costcogoldinventory.com alert is your backup.")
    else:
        print("  💤  All items out of stock. Next check in ~15 min.")

    print()


if __name__ == "__main__":
    main()
