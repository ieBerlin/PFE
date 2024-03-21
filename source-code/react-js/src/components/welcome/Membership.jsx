import PricingPackage from "./PricingPackage";

export default function Membership() {
  return (
    <div>
      <h2>Pricing Chart</h2>
      <h1>Choose Pricing package</h1>
      <h5>Unleash Your Potential: Choose Your Path Today</h5>
      {/* Include Monthly/Yearly switch here if needed */}
      <PricingPackage name="BASIC" />
      <PricingPackage name="STARTER" />
      <PricingPackage name="PREMIUM" />
    </div>
  );
}
