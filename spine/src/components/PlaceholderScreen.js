import ScreenHeader from "@/components/ScreenHeader";

// Stand-in for screens that aren't built yet: a header with a way back home.
export default function PlaceholderScreen({ title }) {
  return (
    <>
      <ScreenHeader title={title} backHref="/" />
      <main className="flex-1" />
    </>
  );
}
