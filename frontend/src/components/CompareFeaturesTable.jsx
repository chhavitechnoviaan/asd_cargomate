import { CheckCircle2, Minus } from "lucide-react";
import { pricingPlans, compareRows } from "../data/pricingPlans";

export default function CompareFeaturesTable() {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-12 sm:pb-16 overflow-x-auto">
      <h2 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-6">
        Compare Features
      </h2>

      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 text-gray-900 font-bold">
              Features
            </th>
            {pricingPlans.map((plan) => (
              <th key={plan.id} className="text-left py-3">
                <p className="text-gray-900 font-bold">{plan.name}</p>
                <p className="text-xs font-normal text-gray-400">
                  {plan.monthly === null ? "Custom" : `$${plan.monthly} /month`}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {compareRows.map((row) => (
            <tr key={row.label} className="border-b border-gray-100">
              <td className="py-3 text-gray-700">{row.label}</td>
              {row.values.map((val, i) =>
                row.isText ? (
                  <td key={i} className="py-3 text-gray-600">
                    {val}
                  </td>
                ) : (
                  <td key={i} className="py-3">
                    {val ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Minus className="w-4 h-4 text-gray-300" />
                    )}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
