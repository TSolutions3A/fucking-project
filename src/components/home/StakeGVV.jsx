import React from "react";

const StakeGVV = () => (
  <div className="w-full md:w-[calc(50%-0.75rem)] bg-slate-900 p-4 md:p-8 rounded-xl">
    <h2 className="font-['BankGothic'] text-2xl md:text-4xl font-bold mb-2 md:mb-6">
      $GVV OVERVIEW
    </h2>
    <p className="font-['Inter'] text-lg text-gray-400 text-justify mb-4 md:mb-8">
      $GVV tokens give holders access to ownership and partnerships in emerging
      tech ventures. <br /> <br /> $GVV tokens give holders equity in AI,
      blockchain, SaaS, Real Estate, and E-Commerce ventures. Holders' assets
      are managed for them and profits reflect in their asset value over time.
      Holders are also allowed to stake their assets for compounded returns.{" "}
      <br />
      $GVV is a driving force that holds together an ecosystem built from a
      community of technology investors supporting the creation of products that
      lead in the tech space.
    </p>
    <img
      src="assets/images/blue-marker.png"
      alt="Blue Marker GVV"
      className="rounded-xl"
    />
  </div>
);

export default StakeGVV;
