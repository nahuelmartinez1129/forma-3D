import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS } from "@/config/navigation";
import { CartIndicator } from "./CartIndicator";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-graphite/8 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-graphite/80 transition-colors hover:bg-mist hover:text-graphite"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1.5">
          <CartIndicator />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
