import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
    name: "Sanjeev Singh",
    company: "S&S Associates",
  },
  {
    quote:
      "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
    name: "Rahul Pal",
    company: "S&S Associates",
  },
  {
    quote:
      "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
    name: "Dev Narayan",
    company: "S&S Associates",
  },
];

export default function Testimonials() {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-12 sm:pb-16">
      <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-900">
        Loved by <span className="text-blue-600">Global Logistics Leaders</span>
      </h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map(({ quote, name, company }, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl p-4"
          >
            <p className="text-xs text-gray-500">{quote}</p>
            <p className="mt-4 text-sm font-bold text-gray-900">{name}</p>
            <p className="text-xs text-gray-400">{company}</p>
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, star) => (
                <Star
                  key={star}
                  className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
