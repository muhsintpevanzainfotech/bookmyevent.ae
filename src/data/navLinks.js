export const navLinks = [
  { name: "Home", href: "/" },

  {
    name: "Main Services",
    dropdown: [
      {
        name: "Wedding",
        href: "/services/wedding",
        image: "/images/wedding.jpg",
      },
      {
        name: "Corporate",
        href: "/services/corporate",
        image: "/images/corporate.jpg",
      },
      {
        name: "Birthday",
        href: "/services/birthday",
        image: "/images/birthday.jpg",
      },
    ],
  },

  {
    name: "Other Services",
    dropdown: [
      {
        name: "Photography",
        href: "/other/photography",
        image: "/images/photo.jpg",
      },
      {
        name: "Makeup",
        href: "/other/makeup",
        image: "/images/makeup.jpg",
      },
      {
        name: "Decoration",
        href: "/other/decoration",
        image: "/images/decor.jpg",
      },
    ],
  },

  { name: "Who we are", href: "/about" },
  { name: "Insight", href: "/insight" },
  { name: "Showcase", href: "/showcase" },
  { name: "Get in Touch", href: "/contact" },
];
