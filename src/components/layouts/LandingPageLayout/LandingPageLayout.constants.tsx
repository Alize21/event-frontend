import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/event" },
];

const BUTTON_ITEMS = [
  { label: "Register", href: "/auth/register", variant: "bordered" },
  { label: "Login", href: "/auth/login", variant: "solid" },
];

const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/nightly.callia/",
    icon: <FaFacebook />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nightly_callia21/",
    icon: <FaInstagram />,
  },
  {
    label: "Twitter",
    href: "https://x.com/_Alize21",
    icon: <FaTwitter />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@igalizexmo_1220",
    icon: <FaYoutube />,
  },
];

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };
