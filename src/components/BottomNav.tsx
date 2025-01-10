import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  faHome,
  faSearch,
  faCommentDots,
  faCalendarAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navItems = [
  { label: "홈", href: "/", icon: faHome },
  { label: "검색", href: "/search", icon: faSearch },
  { label: "피드", href: "/feed", icon: faCommentDots },
  { label: "내 예약", href: "/reservations", icon: faCalendarAlt },
  { label: "메뉴", href: "/menu", icon: faBars },
];

const BottomNav = () => {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <div
              className={`flex flex-col items-center text-sm ${
                router.pathname === item.href
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} size="lg" />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
