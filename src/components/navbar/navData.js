export const navData = [
  { name: "HOME", href: "/", current: true, dropdown: [] },
  {
    name: "SALES ROUND",
    href: "#",
    current: false,
    dropdown: [
      { name: "PRIVATE ROUND 1", href: "/round/1" },
      { name: "PRIVATE ROUND 2", href: "/round/2" },
      { name: "PUBLIC ROUND", href: "/round/3" },
    ],
  },
  {
    name: "STAKING",
    href: "#",
    current: false,
    dropdown: [
      { name: "Overview", href: "/staking" },
      { name: "Staking Token", href: "/staking/token" },
    ],
  },
  {
    name: "OUR VENTURES",
    href: "/ventures",
    current: false,
    dropdown: [
      // { name: "Ventures", href: "ventures" }
    ],
  },
];
