import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { pricingPlans } from "../data/pricingPlans";

export default function PricingPlans({ onGetStarted }) {
  const [billing, setBilling] = useState("monthly");
  const [remotePlans,setRemotePlans]=useState([]);
  useEffect(()=>{const ctrl=new AbortController();fetch(`${import.meta.env.VITE_API_URL||"http://localhost:8000"}/api/ai-subscription/plans?audience=user`,{signal:ctrl.signal}).then(r=>r.ok?r.json():null).then(v=>{if(v?.data?.length)setRemotePlans(v.data)}).catch(()=>{});return ()=>ctrl.abort()},[]);
  const displayPlans=remotePlans.length?remotePlans.filter(p=>p.planType===billing).map(p=>({id:p._id,name:p.name,tagline:p.description||"CargoMate AI plan",monthly:p.price,yearly:p.price,features:Object.entries(p.featureLimits||{}).map(([k,v])=>`${k.replace(/([A-Z])/g," $1")}: ${v}/month`),icon:Check,remote:p})):pricingPlans;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-center text-lg sm:text-xl font-bold text-gray-900">
        Choose the Right Plan for You
      </h2>

      <div className="mt-6 flex justify-center">
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => setBilling("monthly")}
            className={`text-sm font-semibold rounded-full px-4 py-2 ${
              billing === "monthly"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`text-sm font-semibold rounded-full px-4 py-2 ${
              billing === "yearly"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayPlans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 rounded-xl p-5 flex flex-col"
          >
            <div className="text-center">
              <plan.icon className="w-6 h-6 text-blue-600 mx-auto" />
              <p className="mt-2 font-bold text-gray-900">{plan.name}</p>
              <p className="mt-1 text-xs text-gray-500">{plan.tagline}</p>

              <div className="mt-4 h-12 flex items-end justify-center gap-1">
                {plan.monthly === null ? (
                  <span className="text-2xl font-bold text-gray-900">
                    Custom
                  </span>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-gray-900">
                      {plan.remote ? "₹" : "$"}{billing === "monthly" ? plan.monthly : plan.yearly}
                    </span>
                    <span className="text-xs text-gray-400 mb-1">
                      /{billing === "monthly" ? "Month" : "Yearly"}
                    </span>
                  </>
                )}
              </div>
              {plan.monthly === null && (
                <p className="text-xs text-gray-500 mt-1">
                  Tailored to your business needs.
                </p>
              )}
            </div>

            <ul className="mt-4 space-y-2 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => onGetStarted(plan)}
              className="mt-5 border border-blue-500 text-blue-600 text-sm font-semibold rounded-full py-2 hover:bg-blue-50"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
