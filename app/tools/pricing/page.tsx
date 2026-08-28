"use client";

import { useMemo, useState } from "react";

export default function PricingCalculator() {
  const [productCost, setProductCost] = useState("");
  const [shipping, setShipping] = useState("");
  const [ads, setAds] = useState("");
  const [otherCosts, setOtherCosts] = useState("");
  const [margin, setMargin] = useState("30");

  const result = useMemo(() => {
    const product = Number(productCost) || 0;
    const shippingCost = Number(shipping) || 0;
    const advertising = Number(ads) || 0;
    const other = Number(otherCosts) || 0;
    const targetMargin = Number(margin) || 0;

    const totalCost = product + shippingCost + advertising + other;

    if (totalCost <= 0 || targetMargin >= 100) {
      return {
        totalCost: 0,
        sellingPrice: 0,
        profit: 0,
        actualMargin: 0,
      };
    }

    const sellingPrice = totalCost / (1 - targetMargin / 100);
    const profit = sellingPrice - totalCost;
    const actualMargin = (profit / sellingPrice) * 100;

    return {
      totalCost,
      sellingPrice,
      profit,
      actualMargin,
    };
  }, [productCost, shipping, ads, otherCosts, margin]);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="mb-8 inline-block text-sm text-slate-400 hover:text-white"
        >
          ← Back to SellKit
        </a>

        <div className="mb-10">
          <div className="mb-4 inline-flex rounded-xl bg-white/10 px-4 py-2 text-2xl">
            💰
          </div>

          <h1 className="text-4xl font-black md:text-5xl">
            Pricing Calculator
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Calculate the selling price you need to reach your target profit
            margin.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-6 text-xl font-bold">Your costs</h2>

            <div className="space-y-5">
              <Input
                label="Product cost"
                value={productCost}
                onChange={setProductCost}
                placeholder="0"
              />

              <Input
                label="Shipping cost"
                value={shipping}
                onChange={setShipping}
                placeholder="0"
              />

              <Input
                label="Advertising cost"
                value={ads}
                onChange={setAds}
                placeholder="0"
              />

              <Input
                label="Other costs"
                value={otherCosts}
                onChange={setOtherCosts}
                placeholder="0"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Target profit margin (%)
                </label>

                <input
                  type="number"
                  min="0"
                  max="99"
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-white/30"
                  placeholder="30"
                />
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-6 text-xl font-bold">Recommended price</h2>

            <div className="rounded-2xl bg-white/10 p-6">
              <p className="text-sm text-slate-400">Selling price</p>

              <p className="mt-2 text-5xl font-black">
                {formatNumber(result.sellingPrice)}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Based on your target margin
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <ResultCard
                label="Total cost"
                value={formatNumber(result.totalCost)}
              />

              <ResultCard
                label="Expected profit"
                value={formatNumber(result.profit)}
              />

              <ResultCard
                label="Profit margin"
                value={`${formatNumber(result.actualMargin)}%`}
              />

              <ResultCard
                label="Target margin"
                value={`${margin || 0}%`}
              />
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900 p-4">
              <p className="text-sm leading-6 text-slate-400">
                💡 Tip: Your selling price should cover all costs before
                generating profit. Test different margins to find a price that
                works for your market.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-white/30"
        placeholder={placeholder}
      />
    </div>
  );
}
function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold">{value}</p>
    </div>
  );
}
