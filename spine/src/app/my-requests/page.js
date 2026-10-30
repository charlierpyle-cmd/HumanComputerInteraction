import ScreenHeader from "@/components/ScreenHeader";
import { getRequestSeed } from "@/lib/waitlists";
import MyRequestsList from "./MyRequestsList";

export default function MyRequestsPage() {
  return (
    <>
      <ScreenHeader title="My requests" backHref="/" side="buying" />
      <MyRequestsList seed={getRequestSeed()} />
    </>
  );
}