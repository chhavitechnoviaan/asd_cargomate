import { useState } from "react";
import { Search } from "lucide-react";
import heroImage from "../assets/resources-hero.png";

export default function ResourcesHero() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/resources/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-72 sm:h-80 md:h-96 bg-blue-950 overflow-hidden">
      <img
        src={heroImage}
        alt="Global trade network"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-blue-950/40" />
      <div className="relative max-w-2xl mx-auto h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Resources
        </h1>
        <p className="mt-3 text-sm sm:text-base text-blue-100">
          Your go-to hub for the latest update, guides and insights on
          global trade, compliance and logistics
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-6 w-full flex items-center bg-white rounded-full shadow-lg overflow-hidden"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for blogs,update,guides,FAQs..."
            className="flex-1 px-5 py-3 text-sm text-gray-700 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="m-1.5 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full disabled:opacity-60"
          >
            <Search className="w-4 h-4 text-gray-600" />
          </button>
        </form>
      </div>
    </div>
  );
}
