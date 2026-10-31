import { useState } from "react";
import {
  X,
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Users,
  Headset,
  TrendingUp,
  Boxes,
  UserCog,
  Settings,
} from "lucide-react";
import { pricingPlans, compareRows, addOns } from "../data/pricingPlans";

const steps = ["Choose Plan", "Account Details", "Add-ons", "Review & Confirm"];

const addOnIcons = {
  users: Users,
  headset: Headset,
  chart: TrendingUp,
  api: Boxes,
  manager: UserCog,
  gear: Settings,
};

function getIncludedFeatures(planId) {
  const planIndex = pricingPlans.findIndex((p) => p.id === planId);
  const features = compareRows
    .filter((row) => !row.isText && row.values[planIndex])
    .map((row) => row.label);
  const usersRow = compareRows.find((r) => r.label === "Users");
  const supportRow = compareRows.find((r) => r.label === "Support");
  return [
    ...features,
    `Up to ${usersRow.values[planIndex]} Users`,
    `${supportRow.values[planIndex]} Support`,
  ];
}

export default function GetStartedModal({ plan, onClose }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    companyName: "",
    countryCode: "+91",
    phone: "",
  });
  const [selectedAddOns, setSelectedAddOns] = useState({});

  const included = getIncludedFeatures(plan.id);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAddOn = (id) => {
    setSelectedAddOns({ ...selectedAddOns, [id]: !selectedAddOns[id] });
  };

  const chosenAddOns = addOns.filter((a) => selectedAddOns[a.id]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/pricing/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: plan.id,
          account: formData,
          addOns: chosenAddOns.map((a) => a.id),
        }),
      });
      const data = await response.json();
      console.log(data);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 py-8 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              You're All Set!
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-sm">
              Your {plan.name} plan has been activated. A welcome email with
              your account details is on its way.
            </p>
            <button
              onClick={onClose}
              className="mt-6 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg px-6 py-2.5"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-900">
              Get Started with <span className="text-blue-600">{plan.name} Plan</span>
            </h2>

            <div className="mt-6 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        i <= step
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold ${
                        i <= step ? "text-blue-600" : "text-gray-400"
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <span className="w-6 sm:w-10 h-px bg-gray-200" />
                  )}
                </div>
              ))}
            </div>

            {step === 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-sm font-bold text-gray-900 mb-3">
                    Plan Summary
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <plan.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{plan.name}</p>
                      {plan.monthly !== null && (
                        <p className="text-sm text-gray-500">
                          ${plan.monthly}
                          <span className="text-xs">/month</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    {plan.tagline}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-sm font-bold text-gray-900 mb-3">
                    What's Included
                  </p>
                  <ul className="space-y-2">
                    {included.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center text-center">
                  <p className="text-sm font-bold text-gray-900 mb-3">
                    Need Help Choosing?
                  </p>
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <Headphones className="w-7 h-7 text-blue-600" />
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Our Experts are here to help you choose the right plan
                    for your business.
                  </p>
                  <button className="mt-4 w-full border border-blue-500 text-blue-600 text-sm font-semibold rounded-lg py-2">
                    Talk to an Expert
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-2">
                  <p className="text-sm font-bold text-gray-900 mb-4">
                    Account Details
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-900">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-900">
                        Business Email
                      </label>
                      <input
                        type="email"
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleChange}
                        placeholder="Enter your business email"
                        className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-900">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                        className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-900">
                        Phone Number
                      </label>
                      <div className="mt-1 flex gap-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="border border-gray-200 rounded-lg px-2 py-2.5 text-sm outline-none"
                        >
                          <option value="+91">+91</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                        </select>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-gray-900">
                    Your Data is Safe
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    We use industry standard security to protect your
                    information.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {["Secure Encryption", "No spam guaranteed", "Privacy Protected"].map(
                      (t) => (
                        <li key={t} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          {t}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-8">
                <p className="text-sm font-bold text-gray-900">
                  Add-ons (Optional)
                </p>
                <p className="text-xs text-gray-500">
                  Enhance your plan with additional modules
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {addOns.map((addon) => {
                    const AddonIcon = addOnIcons[addon.icon];
                    const checked = !!selectedAddOns[addon.id];
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`text-left border rounded-xl p-4 ${
                          checked ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <AddonIcon className="w-6 h-6 text-blue-600" />
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAddOn(addon.id)}
                            className="w-4 h-4"
                          />
                        </div>
                        <p className="mt-2 text-sm font-bold text-gray-900">
                          {addon.title}
                        </p>
                        <p className="text-xs text-gray-500">{addon.desc}</p>
                        <p className="mt-2 text-sm font-semibold text-gray-900">
                          {addon.price}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-center text-xs text-gray-400">
                  You can add or remove add-ons anytime
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-sm font-bold text-gray-900 mb-3">
                    Review Your Order
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Plan</span>
                      <span className="text-gray-900 font-medium">
                        {plan.name} Plan{" "}
                        {plan.monthly !== null && `$${plan.monthly}.00 /month`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Billing Cycle</span>
                      <span className="text-gray-900 font-medium">Monthly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Add-ons</span>
                      <span className="text-gray-900 font-medium">
                        {chosenAddOns.length
                          ? chosenAddOns.map((a) => a.title).join(", ")
                          : "None"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">
                      {plan.monthly !== null ? `$${plan.monthly}.00 /month` : "Custom"}
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900">
                      What's Next?
                    </p>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <ul className="mt-3 space-y-2">
                    {[
                      "Complete your purchase",
                      "Instant account activation",
                      "Access to all features",
                      "Welcome email with details",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-gray-400">
                    Cancel anytime. No hidden charges.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 0 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg px-6 py-2.5"
                >
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="bg-blue-600 text-white text-sm font-semibold rounded-lg px-6 py-2.5"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="bg-green-600 text-white text-sm font-semibold rounded-lg px-6 py-2.5 disabled:opacity-60"
                >
                  {loading ? "Processing..." : "Confirm & Start Plan"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
