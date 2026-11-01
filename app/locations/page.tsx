import { BranchLocations } from "@/components/BranchLocations";
import { PageIntro } from "@/components/PageIntro";

export const metadata = {
  title: "Locations",
  description: "Find White's Castle branch locations, order hours, and contact actions."
};

export default function LocationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Branches"
        title="Choose a nearby kitchen"
        copy="Select your city and branch before ordering delivery or pick-up from White's Castle."
      />
      <BranchLocations standalone />
    </>
  );
}
