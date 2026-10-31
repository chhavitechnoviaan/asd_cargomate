import Footer from "../components/Footer";

export default function ComingSoonPage({ title }) {
  return (
    <div>
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          This page is coming soon.
        </p>
      </div>
      <Footer />
    </div>
  );
}
