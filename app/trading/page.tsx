"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, ArrowUpRight, Menu, X, Monitor, Smartphone } from "lucide-react";

// Asset classes data
const forexData = [
  { symbol: "EURUSD", spreads: 10, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: 3.68, ask: -10.59 },
  { symbol: "GBPUSD", spreads: 12, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -3.31, ask: -3.98 },
  { symbol: "AUDUSD", spreads: 14, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -0.84, ask: -2.77 },
  { symbol: "USDJPY", spreads: 13, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -29.59, ask: 0.98 },
  { symbol: "USDCAD", spreads: 13, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -8.91, ask: 1.89 },
  { symbol: "EURGBP", spreads: 12, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: 1.39, ask: -7.12 },
  { symbol: "EURCHF", spreads: 15, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -9.81, ask: 0.72 },
  { symbol: "NZDUSD", spreads: 16, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: 0.12, ask: -3.19 },
  { symbol: "USDCHF", spreads: 13, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -13.82, ask: 5.33 },
  { symbol: "EURJPY", spreads: 17, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -13.23, ask: -1.14 },
  { symbol: "GBPJPY", spreads: 20, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -36.21, ask: 1.48 },
  { symbol: "EURAUD", spreads: 23, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: 1.11, ask: -14.87 },
  { symbol: "GBPAUD", spreads: 23, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -10.23, ask: -5.18 },
  { symbol: "EURCAD", spreads: 20, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -3.18, ask: -8.21 },
  { symbol: "GBPCAD", spreads: 24, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -14.93, ask: 1.22 },
  { symbol: "AUDJPY", spreads: 13, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -14.2, ask: 1.87 },
  { symbol: "AUDCAD", spreads: 12, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -5.98, ask: 0.13 },
  { symbol: "NZDJPY", spreads: 15, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -13.56, ask: -0.92 },
  { symbol: "NZDCAD", spreads: 16, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -5.23, ask: -1.56 },
  { symbol: "CHFJPY", spreads: 27, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -8.76, ask: -13.28 },
  { symbol: "AUDCHF", spreads: 11, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -7.99, ask: 3.01 },
  { symbol: "NZDCHF", spreads: 25, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -6.87, ask: 2.98 },
  { symbol: "AUDNZD", spreads: 17, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -6.29, ask: -2.72 },
  { symbol: "EURNZD", spreads: 20, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: 0.22, ask: -14.28 },
  { symbol: "GBPNZD", spreads: 19, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -15.59, ask: -3.91 },
  { symbol: "GBPCHF", spreads: 25, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -17.97, ask: 7.01 },
  { symbol: "CADJPY", spreads: 32, contractSize: "100,000", commission: "No", leverage: "1:5000", volume: "0.01/50", swapFree: 2, bid: -11.85, ask: -0.63 },
  { symbol: "CADCHF", spreads: 17, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -7.12, ask: 2.01 },
  { symbol: "EURDKK", spreads: 176, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -42.16, ask: -49.99 },
  { symbol: "EURHUF", spreads: 270, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -1.13, ask: -76.78 },
  { symbol: "EURNOK", spreads: 750, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -41.39, ask: -131.06 },
  { symbol: "EURPLN", spreads: 471, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -6.89, ask: -57.82 },
  { symbol: "EURSEK", spreads: 150, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -109.98, ask: -90.12 },
  { symbol: "EURTRY", spreads: 8600, contractSize: "100,000", commission: "No", leverage: "1:50", volume: "0.01/50", swapFree: 2, bid: 91, ask: -4842 },
  { symbol: "USDCNH", spreads: 262, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -53.21, ask: -1.33 },
  { symbol: "USDCZK", spreads: 145, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -35.75, ask: -112.64 },
  { symbol: "USDDKK", spreads: 380, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -59.63, ask: 0.09 },
  { symbol: "USDHKD", spreads: 182, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -46.22, ask: 3.82 },
  { symbol: "USDHUF", spreads: 315, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -18.92, ask: -57.66 },
  { symbol: "USDMXN", spreads: 994, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: 81, ask: -447.98 },
  { symbol: "USDNOK", spreads: 1485, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -79.58, ask: -73.46 },
  { symbol: "USDPLN", spreads: 300, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -21.18, ask: -32.59 },
  { symbol: "USDSEK", spreads: 592, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -128.58, ask: -8.89 },
  { symbol: "USDSGD", spreads: 183, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -16.28, ask: 0.11 },
  { symbol: "USDTRY", spreads: 6350, contractSize: "100,000", commission: "No", leverage: "1:50", volume: "0.01/50", swapFree: 2, bid: 234, ask: -4295 },
  { symbol: "USDZAR", spreads: 1137, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: 34.96, ask: -182.51 },
  { symbol: "TRYJPY", spreads: 94, contractSize: "100,000", commission: "No", leverage: "1:50", volume: "0.01/50", swapFree: 2, bid: -6.5, ask: 0.18 },
  { symbol: "DKKNOK", spreads: 83, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -63, ask: -35 },
  { symbol: "AUDSGD", spreads: 70, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -3, ask: -5 },
  { symbol: "CHFDKK", spreads: 327, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -54.12, ask: -5.85 },
  { symbol: "CHFSGD", spreads: 129, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -2.62, ask: -21.31 },
  { symbol: "DKKSEK", spreads: 97, contractSize: "100,000", commission: "No", leverage: "1:500", volume: "0.01/50", swapFree: 2, bid: -54.12, ask: -5.85 }
];

const cryptoData = [
  { symbol: "BTCUSD", spreads: 4314, contractSize: "1", leverage: "1:1000", commission: "No", volume: "0.01/50", swapFree: 0 },
  { symbol: "BTCJPY", spreads: 7521, contractSize: "1", leverage: "1:1000", commission: "No", volume: "0.01/50", swapFree: 0 },
  { symbol: "ETHUSD", spreads: 160, contractSize: "1", leverage: "1:1000", commission: "No", volume: "0.1/150", swapFree: 0 },
  { symbol: "ETHJPY", spreads: 283, contractSize: "1", leverage: "1:1000", commission: "No", volume: "0.1/150", swapFree: 0 },
  { symbol: "XRPUSD", spreads: 694, contractSize: "1", leverage: "1:1000", commission: "No", volume: "100/120,000", swapFree: 0 },
  { symbol: "XRPJPY", spreads: 1164, contractSize: "1", leverage: "1:1000", commission: "No", volume: "100/120,000", swapFree: 0 },
  { symbol: "LTCUSD", spreads: 129, contractSize: "1", leverage: "1:1000", commission: "No", volume: "1/400", swapFree: 0 },
  { symbol: "LTCJPY", spreads: 25, contractSize: "1", leverage: "1:1000", commission: "No", volume: "1/400", swapFree: 0 },
  { symbol: "BCHUSD", spreads: 155, contractSize: "1", leverage: "1:1000", commission: "No", volume: "0.3/200", swapFree: 0 },
  { symbol: "BCHJPY", spreads: 229, contractSize: "1", leverage: "1:1000", commission: "No", volume: "0.3/200", swapFree: 0 },
  { symbol: "XRPBTC", spreads: 715, contractSize: "1", leverage: "1:1000", commission: "No", volume: "500/100000", swapFree: 0 },
  { symbol: "ETHBTC", spreads: 1895, contractSize: "1", leverage: "1:1000", commission: "No", volume: "500/100000", swapFree: 0 },
  { symbol: "LTCBTC", spreads: 56715, contractSize: "1", leverage: "1:1000", commission: "No", volume: "500/1000000", swapFree: 0 }
];

const syntheticCryptoData = [
  { symbol: "BTCXAU", spreads: 30, contractSize: "1", leverage: "1:50", commission: "No", swapFree: 2 },
  { symbol: "BTCXAG", spreads: 2031, contractSize: "1", leverage: "1:50", commission: "No", swapFree: 2 },
  { symbol: "BTCUSO", spreads: 2500, contractSize: "1", leverage: "1:50", commission: "No", swapFree: 2 },
  { symbol: "BTCSPX", spreads: 213, contractSize: "1", leverage: "1:50", commission: "No", swapFree: 2 },
  { symbol: "BTCNAS", spreads: 17733, contractSize: "1", leverage: "1:50", commission: "No", swapFree: 2 },
  { symbol: "BTCDOW", spreads: 480, contractSize: "1", leverage: "1:50", commission: "No", swapFree: 2 },
  { symbol: "BTCAPL", spreads: 1391, contractSize: "1", leverage: "1:50", commission: "No", swapFree: 2 },
  { symbol: "BTCMET", spreads: 191, contractSize: "1", leverage: "1:50", commission: "No", swapFree: 2 },
  { symbol: "BTCAMZ", spreads: 2555, contractSize: "1", leverage: "1:50", commission: "No", swapFree: 2 }
];

const metalsData = [
  { symbol: "XAUUSD", spreads: 26, contractSize: "100", leverage: "1:2000", commission: "No", volume: "0.01/50", swapFree: 0, bid: 28.51, ask: -80.12 },
  { symbol: "XAGUSD", spreads: 20, contractSize: "5000", leverage: "1:2000", commission: "No", volume: "0.01/50", swapFree: 0, bid: 3.18, ask: -21.2 }
];

const energiesData = [
  { symbol: "USOil", spreads: 8, contractSize: "100", leverage: "1:100", commission: "No", volume: "0.01/100", swapFree: 2, bid: -20, ask: 0.65 },
  { symbol: "UKOil", spreads: 5, contractSize: "100", leverage: "1:100", commission: "No", volume: "0.01/100", swapFree: 2, bid: -20, ask: 0.11 },
  { symbol: "NGAS", spreads: 36, contractSize: "1000", leverage: "1:100", commission: "No", volume: "0.01/100", swapFree: 2, bid: 1.68, ask: -5.14 }
];

const indicesData = [
  { symbol: "US30", spreads: 195, contractSize: "1", leverage: "1:100", commission: "No", volume: "1/150", swapFree: 0, bid: 1.12, ask: -7.46 },
  { symbol: "US100", spreads: 188, contractSize: "1", leverage: "1:100", commission: "No", volume: "1/150", swapFree: 0, bid: 0.9, ask: -5.04 },
  { symbol: "US500", spreads: 40, contractSize: "1", leverage: "1:100", commission: "No", volume: "1/150", swapFree: 0, bid: 0.25, ask: -1.66 },
  { symbol: "JP225", spreads: 9, contractSize: "100", leverage: "1:100", commission: "No", volume: "1/200", swapFree: 0, bid: -1.44, ask: -2.05 },
  { symbol: "UK100", spreads: 201, contractSize: "1", leverage: "1:100", commission: "No", volume: "1/150", swapFree: 0, bid: 0.35, ask: -1.77 },
  { symbol: "GER40", spreads: 516, contractSize: "1", leverage: "1:100", commission: "No", volume: "1/150", swapFree: 0, bid: 0.04, ask: -2.76 },
  { symbol: "FRA40", spreads: 357, contractSize: "1", leverage: "1:100", commission: "No", volume: "1/150", swapFree: 0, bid: 0.02, ask: -0.99 },
  { symbol: "AUD200", spreads: 86, contractSize: "1", leverage: "1:100", commission: "No", volume: "1/200", swapFree: 0, bid: 0.24, ask: -1.41 }
];

const stocksData = [
  { symbol: "#AAPL", spreads: 86, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#AIG", spreads: 49, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#AMZN", spreads: 75, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#AXP", spreads: 36, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#BABA", spreads: 22, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#BAC", spreads: 35, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#BIDU", spreads: 39, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#BP", spreads: 26, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#BX", spreads: 10, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#C", spreads: 11, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#CAT", spreads: 20, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#COST", spreads: 31, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#CSCO", spreads: 21, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#CVX", spreads: 31, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#DAL", spreads: 29, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#DIS", spreads: 32, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#DVN", spreads: 20, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#EA", spreads: 40, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#EBAY", spreads: 22, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#F", spreads: 28, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#META", spreads: 61, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#GE", spreads: 57, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#GM", spreads: 30, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#GOOGL", spreads: 77, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#GPS", spreads: 24, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#HPQ", spreads: 25, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#INTC", spreads: 23, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#JNJ", spreads: 30, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#JPM", spreads: 48, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#KO", spreads: 36, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#LYFT", spreads: 46, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#MCD", spreads: 31, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#MRK", spreads: 40, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#MS", spreads: 10, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#MSFT", spreads: 21, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#NFLX", spreads: 23, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#NKE", spreads: 31, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#NVDA", spreads: 61, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#ORCL", spreads: 20, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#PFE", spreads: 30, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#PYPL", spreads: 31, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#SBUX", spreads: 52, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#SNAP", spreads: 63, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#T", spreads: 39, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#TSLA", spreads: 45, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#V", spreads: 21, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#VOD", spreads: 10, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#WFC", spreads: 37, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#WMT", spreads: 11, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 },
  { symbol: "#XOM", spreads: 41, contractSize: "100 Shares", leverage: "1:50", commission: "No", volume: "0.01/50", swapFree: 0, bid: -1.21, ask: -5.1 }
];

// Popular data (a selection from metals, crypto, forex, energies)
const popularData = [
  { symbol: "XAUUSD", spreads: 26, contractSize: "100", leverage: "1:2000", commission: "No", volume: "0.01/50", swapFree: 2 },
  { symbol: "BTCUSD", spreads: 4314, contractSize: "1", leverage: "1:1000", commission: "No", volume: "0.01/50", swapFree: 0 },
  { symbol: "USDJPY", spreads: 13, contractSize: "100,000", leverage: "1:5000", commission: "No", volume: "0.01/100", swapFree: 2 },
  { symbol: "USOil", spreads: 8, contractSize: "100", leverage: "1:100", commission: "No", volume: "0.01/100", swapFree: 2 },
  { symbol: "EURUSD", spreads: 10, contractSize: "100,000", leverage: "1:5000", commission: "No", volume: "0.01/100", swapFree: 2 },
  { symbol: "US30", spreads: 195, contractSize: "1", leverage: "1:100", commission: "No", volume: "1/150", swapFree: 0 },
  { symbol: "GBPUSD", spreads: 7, contractSize: "100,000", leverage: "1:5000", commission: "No", volume: "0.01/100", swapFree: 2 },
  { symbol: "GTi12", spreads: 2200, contractSize: "1", leverage: "1:100", commission: "No", volume: "1/1000", swapFree: 0 }
];

const categoryData: Record<string, any[]> = {
  "Popular": popularData,
  "Forex": forexData,
  "Cryptocurrencies": cryptoData,
  "Synthetic Cryptos": syntheticCryptoData,
  "Precious Metals": metalsData,
  "Energies": energiesData,
  "Equity Indices": indicesData,
  "Stocks": stocksData
};

export default function Trading() {
  const [activeTab, setActiveTab] = useState("Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [accountType, setAccountType] = useState("OPTIMUS");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const platformDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (platformDropdownRef.current && !platformDropdownRef.current.contains(e.target as Node)) {
        setPlatformDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter instruments based on search query
  const getFilteredData = () => {
    const list = categoryData[activeTab] || [];
    if (!searchQuery) return list;
    return list.filter((item) =>
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredData = getFilteredData();

  // Helper to adjust spread value dynamically based on account type
  const displaySpread = (baseSpread: number) => {
    if (accountType === "STANDARD") {
      return Math.round(baseSpread * 1.5);
    }
    if (accountType === "PREMIUM") {
      return Math.round(baseSpread * 0.8);
    }
    return baseSpread; // OPTIMUS is original base
  };

  // Helper to adjust leverage value dynamically based on account type
  const displayLeverage = (baseLeverage: string) => {
    if (accountType === "PREMIUM" && baseLeverage.startsWith("1:")) {
      const value = parseInt(baseLeverage.substring(2), 10);
      return `1:${Math.min(value * 2, 5000)}`;
    }
    return baseLeverage;
  };

  const tabs = [
    "Popular",
    "Forex",
    "Cryptocurrencies",
    "Synthetic Cryptos",
    "Precious Metals",
    "Energies",
    "Equity Indices",
    "Stocks"
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#10B981]/30">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A4FE46]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Navbar */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6 max-w-[1200px] w-full mx-auto">
        <div className="flex items-center group cursor-pointer">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#059669] to-[#A4FE46] rounded-xl flex items-center justify-center transform -rotate-12 shadow-[0_0_20px_rgba(16, 185, 129,0.4)] group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
              <div className="flex items-end space-x-[2px] h-5">
                <div className="w-1.5 h-2 bg-white/80 rounded-sm"></div>
                <div className="w-1.5 h-3.5 bg-white/90 rounded-sm"></div>
                <div className="w-1.5 h-5 bg-white rounded-sm"></div>
              </div>
            </div>
            <span className="font-bold text-white text-lg tracking-wide group-hover:text-[#A4FE46] transition-colors">Pippulse FX</span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-white/70">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          
          {/* Platform Dropdown */}
          <div className="relative" ref={platformDropdownRef}>
            <button
              onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
              className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              <span>Platform</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white/50 transition-transform duration-300 ${platformDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {platformDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/3 mt-4 w-[420px] bg-[#0c0c0e]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-[0_25px_60px_rgba(16,185,129,0.15)] z-50 flex gap-6 animate-[fadeInUp_0.25s_ease-out]">
                {/* Column 1 */}
                <div className="flex-[1.2] space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Pippulsefx Platforms</h4>
                  <div className="flex flex-col space-y-1">
                    <Link href="/platforms/pippulsefx" onClick={() => setPlatformDropdownOpen(false)} className="flex flex-col p-3 rounded-xl hover:bg-white/[0.04] transition-all group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white group-hover:text-[#A4FE46] transition-colors">Pippulsefx App</span>
                        <span className="text-[8px] font-bold text-white bg-[#006a60] px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
                      </div>
                      <span className="text-[11px] text-white/40 group-hover:text-white/60 transition-colors">Our proprietary mobile and desktop platform.</span>
                    </Link>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="w-[1px] bg-white/10 self-stretch"></div>
                
                {/* Column 2 */}
                <div className="flex-1 space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">MT5 Platforms</h4>
                  <div className="flex flex-col space-y-1">
                    {[
                      { os: "Windows", desc: "Desktop installer for PC", path: "/platforms/windows", icon: Monitor },
                      { os: "MacOS", desc: "Apple package", path: "/platforms/macos", icon: Monitor },
                      { os: "Android", desc: "Play Store app", path: "/platforms/android", icon: Smartphone },
                      { os: "iOS", desc: "App Store app", path: "/platforms/ios", icon: Smartphone }
                    ].map(({ os, desc, path, icon: Icon }) => (
                      <Link
                        key={os}
                        href={path}
                        onClick={() => setPlatformDropdownOpen(false)}
                        className="flex items-start space-x-2.5 p-2 rounded-lg hover:bg-white/[0.04] transition-all group"
                      >
                        <Icon className="w-4 h-4 text-white/45 group-hover:text-[#A4FE46] mt-0.5 transition-colors" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">{os}</span>
                          <span className="text-[10px] text-white/40 group-hover:text-white/50 transition-colors">{desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/promotions" className="hover:text-white transition-colors">Promotion</Link>
          <Link href="/partners" className="hover:text-white transition-colors">Partners</Link>
          <Link href="/trading" className="text-[#A4FE46] font-semibold transition-all">Trading</Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-4">
          <Link href="#" className="hidden sm:inline-block bg-white text-black px-7 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Login
          </Link>
          {/* Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white focus:outline-none p-2 rounded-lg bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[88px] bg-black/95 backdrop-blur-lg border-b border-white/10 py-6 px-8 z-50 flex flex-col space-y-5 animate-[fadeInUp_0.3s_ease-out]">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">About</Link>
          
          {/* Mobile Platform Submenu */}
          <div className="flex flex-col space-y-2 py-2 border-b border-white/5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A4FE46]">Pippulsefx Platforms</span>
            <div className="flex flex-col space-y-2 pl-2">
              <Link href="/platforms/pippulsefx" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-white/70 hover:text-[#A4FE46]">
                <span>Pippulsefx App</span>
                <span className="text-[8px] font-bold text-white bg-[#006a60] px-2 py-0.5 rounded-full uppercase tracking-wider mr-2">Popular</span>
              </Link>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A4FE46] mt-2">MT5 Platforms</span>
            <div className="grid grid-cols-2 gap-2 pl-2 pt-1">
              {[
                { name: "Windows", path: "/platforms/windows" },
                { name: "MacOS", path: "/platforms/macos" },
                { name: "Android", path: "/platforms/android" },
                { name: "iOS", path: "/platforms/ios" }
              ].map((os) => (
                <Link key={os.name} href={os.path} onClick={() => setMobileMenuOpen(false)} className="py-1.5 px-3 rounded-lg bg-white/5 text-sm font-semibold text-white/70 hover:text-[#A4FE46] hover:bg-white/10 transition-all text-center">
                  {os.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/promotions" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Promotion</Link>
          <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Partners</Link>
          <Link href="/trading" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#A4FE46] py-2 border-b border-white/5 font-semibold">Trading</Link>
          
          <Link href="#" onClick={() => setMobileMenuOpen(false)} className="bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
            Login
          </Link>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-[1240px] mx-auto px-4 pt-12 pb-24">
        
        {/* Page Headings */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-center tracking-tight leading-[1.1] mb-6">
            Discover Global Market Opportunities
          </h1>
          <p className="text-white/60 text-center text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Trade Hundreds of CFD Stocks, Forex, and Commodities on One Unified Account.
          </p>
        </div>

        {/* Tab System Navigation */}
        <div className="w-full border-b border-white/10 mb-10 overflow-x-auto no-scrollbar">
          <div className="flex space-x-8 md:space-x-10 min-w-max pb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery("");
                }}
                className={`text-sm md:text-base font-semibold transition-all relative pb-3 hover:text-white focus:outline-none ${
                  activeTab === tab ? "text-white" : "text-white/40"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A4FE46] shadow-[0_0_8px_rgba(164,254,70,0.6)]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls: Account Type & Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 w-full">
          {/* Select Account Type Dropdown */}
          <div className="flex items-center space-x-3 z-30">
            <span className="text-sm text-white/50 font-medium">Select account type</span>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between space-x-3 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-sm font-bold tracking-wider text-white transition-all backdrop-blur-md"
              >
                <span>{accountType}</span>
                <ChevronDown className={`w-4 h-4 text-white/55 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-[#0d0d10] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                  {["OPTIMUS", "STANDARD", "PREMIUM"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setAccountType(type);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-xs font-bold transition-colors hover:bg-white/5 ${
                        accountType === type ? "text-[#A4FE46]" : "text-white/70"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 z-20">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 focus:border-white/20 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Dynamic Instruments Table */}
        <div className="w-full bg-[#0c0c0e]/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm z-10 relative">
          <div className="overflow-x-auto overflow-y-auto max-h-[600px] w-full">
            <table className="w-full border-collapse text-left text-sm whitespace-nowrap">
              <thead className="sticky top-0 z-20 bg-[#0d0d10] border-b border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.1)]">
                <tr className="bg-white/[0.01]">
                  <th className="px-6 py-4 font-bold text-white/60">Symbol</th>
                  <th className="px-6 py-4 font-bold text-white/60">Min. Spreads (Points)</th>
                  <th className="px-6 py-4 font-bold text-white/60">Contract Size</th>
                  
                  {/* Category-specific table headers */}
                  {activeTab !== "Synthetic Cryptos" && (
                    <th className="px-6 py-4 font-bold text-white/60">Maximum Leverage</th>
                  )}
                  <th className="px-6 py-4 font-bold text-white/60">Commission</th>
                  
                  {activeTab !== "Synthetic Cryptos" && (
                    <th className="px-6 py-4 font-bold text-white/60">Min/Max Volume</th>
                  )}
                  
                  {activeTab !== "Forex" && (
                    <th className="px-6 py-4 font-bold text-white/60">Swap-free days allowance</th>
                  )}
                  
                  {/* Swap rates visible in active lists that provide them */}
                  {(activeTab === "Forex" || activeTab === "Precious Metals" || activeTab === "Energies" || activeTab === "Equity Indices" || activeTab === "Stocks") && (
                    <>
                      <th className="px-6 py-4 font-bold text-white/60">Swap Rates (BID)</th>
                      <th className="px-6 py-4 font-bold text-white/60">Swap Rates (ASK)</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr 
                      key={row.symbol}
                      className={`hover:bg-white/[0.02] transition-colors ${idx % 2 === 1 ? 'bg-white/[0.005]' : ''}`}
                    >
                      <td className="px-6 py-4 font-bold text-white">{row.symbol}</td>
                      <td className="px-6 py-4 text-white/80">{displaySpread(row.spreads)}</td>
                      <td className="px-6 py-4 text-white/80">{row.contractSize}</td>
                      
                      {activeTab !== "Synthetic Cryptos" && (
                        <td className="px-6 py-4 text-white/80">{displayLeverage(row.leverage)}</td>
                      )}
                      <td className="px-6 py-4 text-white/80">{row.commission}</td>
                      
                      {activeTab !== "Synthetic Cryptos" && (
                        <td className="px-6 py-4 text-white/80">{row.volume}</td>
                      )}
                      
                      {activeTab !== "Forex" && (
                        <td className="px-6 py-4 text-white/80">{row.swapFree}</td>
                      )}
                      
                      {(activeTab === "Forex" || activeTab === "Precious Metals" || activeTab === "Energies" || activeTab === "Equity Indices" || activeTab === "Stocks") && (
                        <>
                          <td className={`px-6 py-4 font-medium ${row.bid > 0 ? 'text-green-400' : row.bid < 0 ? 'text-red-400' : 'text-white/80'}`}>
                            {row.bid}
                          </td>
                          <td className={`px-6 py-4 font-medium ${row.ask > 0 ? 'text-green-400' : row.ask < 0 ? 'text-red-400' : 'text-white/80'}`}>
                            {row.ask}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center text-white/40">
                      No symbols match your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer / Notes Area */}
        <div className="mt-12 space-y-3.5 text-xs md:text-sm text-white/50 max-w-4xl leading-relaxed">
          {[
            "All trading conditions displayed are based on pricing provided by MT5. Prices may vary depending on the country & trading platform being used.",
            "All of the above instruments are based on Market Execution.",
            "Spreads are calculated based on the exact difference between the buy and sell price.",
            "You can find all the details about dynamic leverage here.",
            "You can find all the details about all Instruments' Trading Sessions here.",
            "Learn how we calculate our swap charges here.",
            "Find out when exactly swap charges take place here."
          ].map((text, i) => (
            <div key={i} className="flex items-start">
              <div className="w-1.5 h-1.5 bg-[#A4FE46] rotate-45 mr-3 mt-1.5 flex-shrink-0" />
              <p>{text}</p>
            </div>
          ))}
        </div>

        {/* Get Started CTA Banner */}
        <div className="mt-20 relative w-full bg-[#0d0d10] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 z-10 group/banner">
          
          {/* Custom animated lines background inside banner */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-full pointer-events-none opacity-30 group-hover/banner:opacity-40 transition-opacity duration-700">
            <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-125 origin-right">
              <path d="M50 150 C 150 120, 250 80, 350 50" stroke="url(#gradient-accent)" strokeWidth="6" strokeLinecap="round" />
              <path d="M70 160 C 170 130, 270 90, 370 60" stroke="#10B981" strokeWidth="2" strokeDasharray="6 6" />
              <defs>
                <linearGradient id="gradient-accent" x1="50" y1="150" x2="350" y2="50" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A4FE46" />
                  <stop offset="1" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-3 z-10">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Get started</h3>
            <p className="text-white/60 text-base">Apply and start trading in minutes</p>
          </div>

          <div className="z-10">
            <Link 
              href="#" 
              className="inline-flex items-center space-x-2 bg-[#006a60] hover:bg-[#00524a] text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(0,106,96,0.3)] hover:shadow-[0_0_30px_rgba(0,106,96,0.5)] hover:scale-[1.02]"
            >
              <span>Open an account</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </main>

      {/* Footer Disclaimer Wrap */}
      <section className="w-full bg-[#050507] py-12 border-t border-white/5 relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 text-xs text-white/35 leading-relaxed space-y-6">
                    <div>
            <h4 className="font-semibold text-white/60 mb-2 uppercase tracking-wider text-[10px]">Risk Warning</h4>
            <p>
              Trading derivatives carries significant risks. It is not suitable for all investors and if you are a professional client, you could lose substantially more than your initial investment. When acquiring our derivative products, you have no entitlement, right or obligation to the underlying financial assets. Past performance is no indication of future performance and tax laws are subject to change. The information on this website is general in nature and doesn't take into account your personal objectives, financial circumstances, or needs. Accordingly, before acting on the advice, you should consider whether the advice is suitable for you having regard to your objectives, financial situation and needs. We encourage you to seek independent advice if necessary. Please read our legal documents and ensure that you fully understand the risks before you make any trading decisions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white/60 mb-2 uppercase tracking-wider text-[10px]">Regional Restrictions</h4>
            <p>
              We do not offer our services to residents of certain jurisdictions, including India, Canada, China, Singapore, the United States, or any jurisdictions listed on the FATF &quot;blacklist&quot; or subject to US/EU/UN sanctions. For more information please refer to our FAQ page. The information on this site and the products and services offered are not intended for distribution to any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation. While the Authority has granted a securities or derivatives investment business licence to the Licensee, the Authority does not endorse or vouch for the merits of the products offered by the Licensee.
            </p>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="w-full bg-[#030305] border-t border-white/5 py-12 relative z-10">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/40">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#059669] to-[#A4FE46] rounded-lg flex items-center justify-center transform -rotate-12 shadow-[0_0_15px_rgba(16, 185, 129,0.3)]">
              <div className="flex items-end space-x-[2px] h-3.5">
                <div className="w-1 h-1.5 bg-white/85 rounded-sm"></div>
                <div className="w-1 h-2.5 bg-white/95 rounded-sm"></div>
                <div className="w-1 h-3.5 bg-white rounded-sm"></div>
              </div>
            </div>
            <span className="font-bold text-white tracking-wide">Pippulse FX</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link href="/#about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/#dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Pippulse FX. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
