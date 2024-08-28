import CountryButton from "./components/CountryButton";

export default function Home() {
  return (
    <section>
      <h1 className="text-4xl font-bold text-center mt-10">Welcome to Wearther ☀️</h1>
      <p className="text-center text-lg mt-1">
        Find the right fit for your day
      </p>
      <CountryButton />
    </section>
  );
}
