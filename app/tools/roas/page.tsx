"use client";

import { useMemo, useState } from "react";

export default function ROASCalculator() {
  const [revenue, setRevenue] = useState("");
  const [adSpend, setAdSpend] = useState("");

  const result = useMemo(() => {
    const sales = Number(revenue) || 0;
    const ads = Number(adSpend) || 0;

    if (ads <= 0) {
      return {
        roas: 0,
        profit: 0,
        adPercentage: 0,
      };
    }

    const roas = sales / ads;
    const profit = sales - ads;
    const adPercentage = (ads / sales) * 100;

    return {
      roas,
      profit,
      adPercentage: sales > 0 ? adPercentage : 0,
    };
  }, [revenue, adSpend]);

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
            📈
          </div>

          <h1 className="text-4xl font-black md:text-5xl">
            ROAS Calculator
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Calculate your Return on Ad Spend and understand how efficiently
            your advertising budget generates revenue.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-6 text-xl font-bold">Your advertising data</h2>

            <div className="space-y-5">
              <Input
                label="Revenue generated"
                value={revenue}
                onChange={setRevenue}
                placeholder="1000"
              />

              <Input
                label="Advertising spend"
                value={adSpend}
                onChange={setAdSpend}
                placeholder="250"
              />
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900 p-4">
              <p className="text-sm leading-6 text-slate-400">
                💡 ROAS = Revenue ÷ Advertising Spend. For example, spending
                $250 to generate $1,000 in revenue gives you a 4× ROAS.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-6 text-xl font-bold">Your results</h2>

            <div className="rounded-2xl bg-white/10 p-6">
              <p className="text-sm text-slate-400">ROAS</p>

              <p className="mt-2 text-5xl font-black">
                {formatNumber(result.roas)}×
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Return on advertising spend
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <ResultCard
                label="Revenue"
                value={formatNumber(Number(revenue) || 0)}
              />

              <ResultCard
                label="Ad spend"
                value={formatNumber(Number(adSpend) || 0)}
              />

              <ResultCard
                label="Revenue after ads"
                value={formatNumber(result.profit)}
              />

              <ResultCard
                label="Ad cost %"
                value={`${formatNumber(result.adPercentage)}%`}
              />
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900 p-4">
              <p className="text-sm leading-6 text-slate-400">
                📊 A ROAS above 1× means your advertising generated more
                revenue than the ad spend itself. Remember that product,
                shipping, payment, and other business costs are not included
                in this basic ROAS calculation.
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
