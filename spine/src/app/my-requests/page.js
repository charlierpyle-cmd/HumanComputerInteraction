import ScreenHeader from "@/components/ScreenHeader";
import MyRequestsList from "./MyRequestsList";

export default function MyRequestsPage() {
  return (
    <>
      <ScreenHeader title="My requests" backHref="/" side="buying" />
      <MyRequestsList />
    </>
  );
}