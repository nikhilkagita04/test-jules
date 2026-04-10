#!/usr/bin/env python3
"""
Costco Gold Bar Stock Checker
──────────────────────────────
Monitors Costco.com every 15 min for 1oz PAMP Suisse / Rand Refinery
gold bars and fires an SMS to the target phone the moment one is in stock.

Requirements:  pip install requests twilio
Secrets needed (GitHub repo secrets):
    TWILIO_ACCOUNT_SID   – from twilio.com/console
    TWILIO_AUTH_TOKEN    – from twilio.com/console
    TWILIO_PHONE_NUMBER  – your Twilio trial number, e.g. +12015551234
"""

import os
import sys
import requests
from datetime import datetime, timezone

# ── Target phone ──────────────────────────────────────────────────────────────
TARGET_PHONE = "+18482562090"

# ── Products to watch ─────────────────────────────────────────────────────────
PRODUCTS = [
    {
        "name": "1oz PAMP Suisse Lady Fortuna (listing A)",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-lady-fortuna-veriscan-new-in-assay.product.4000186760.html",
    },
    {
        "name": "1oz PAMP Suisse Lady Fortuna (listing B)",
        "url": "https://www.costco.com/1-oz-gold-bar-pamp-suisse-lady-fortuna-veriscan-new-in-assay.product.4000363990.html",
    },
    {
        "name": "1oz Rand Refinery Gold Bar",
        "url": "https://www.costco.com/1-oz-gold-bar-rand-refinery-new-in-assay.product.4000202779.html",
    },
    {
        "name": "100g PAMP Suisse Lady Fortuna",
        "url": "https://www.costco.com/100-gram-gold-bar-pamp-suisse-lady-fortuna-veriscan-new-in-assay.product.4000239966.html",
    },
    {
        "name": "100g Valcambi Combibar",
        "url": "https://www.costco.com/100-gram-gold-valcambi-combibar-new-in-assay.product.4000422320.html",
    },
]

# ── Browser-like headers (reduces chance of being blocked) ───────────────────
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/123.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Cache-Control": "max-age=0",
}


# ── Stock check ───────────────────────────────────────────────────────────────

def check_stock(product: dict) -> tuple[bool | None, str]:
    """
    Returns (in_stock, status_message).
    in_stock = True  → confirmed in stock
    in_stock = False → confirmed out of stock
    in_stock = None  → could not determine (blocked / timeout)
    """
    try:
        resp = requests.get(product["url"], headers=HEADERS, timeout=30)

        if resp.status_code != 200:
            return None, f"HTTP {resp.status_code} — possibly blocked"

        page = resp.text
        low  = page.lower()

        # 1. JSON-LD / embedded product data (most reliable)
        if '"availability":"instock"' in low or '"instock"' in low:
            return True, "In Stock  (embedded JSON)"
        if '"availability":"outofstock"' in low or '"outofstock"' in low:
            return False, "Out of Stock  (embedded JSON)"

        # 2. Visible page text
        if "add to cart" in low and "sold out" not in low:
            return True, "In Stock  (Add to Cart button)"
        if "sold out" in low or "out of stock" in low:
            return False, "Out of Stock  (page text)"

        return False, "Unknown — no clear stock signal found"

    except requests.Timeout:
        return None, "Timeout — Costco did not respond in 30 s"
    except Exception as exc:
        return None, f"Error — {exc}"


# ── SMS via Twilio ────────────────────────────────────────────────────────────

def send_sms(body: str) -> bool:
    sid       = os.environ.get("TWILIO_ACCOUNT_SID")
    token     = os.environ.get("TWILIO_AUTH_TOKEN")
    from_num  = os.environ.get("TWILIO_PHONE_NUMBER")

    if not all([sid, token, from_num]):
        print("  ⚠️  Twilio env vars not set — SMS skipped")
        return False

    try:
        from twilio.rest import Client
        msg = Client(sid, token).messages.create(
            body=body, from_=from_num, to=TARGET_PHONE
        )
        print(f"  ✅ SMS sent  (SID: {msg.sid})")
        return True
    except Exception as exc:
        print(f"  ❌ SMS failed — {exc}")
        return False


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    print(f"\n{'═' * 58}")
    print(f"  🥇 Costco Gold Checker  |  {now}")
    print(f"{'═' * 58}")

    in_stock_items = []

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

    print(f"\n{'─' * 58}")

    if in_stock_items:
        print(f"  🚨 IN STOCK!  Sending SMS to {TARGET_PHONE} …")
        lines = ["🚨 COSTCO GOLD IN STOCK! Buy NOW!\n"]
        for item in in_stock_items:
            lines.append(f"• {item['name']}")
            lines.append(f"  {item['url']}\n")
        lines.append(f"Checked: {now}")
        send_sms("\n".join(lines))
    else:
        print("  💤  All items out of stock. Next check in 15 min.")

    print()


if __name__ == "__main__":
    main()
