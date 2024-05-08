"use client";
import { LogoIcon } from "./Icons";
interface RouteProps {
  href: string;
  label: string;
}

export const Footer = () => {
  const routeList: RouteProps[] = [
    {
      href: "/#features",
      label: "Features",
    },
    {
      href: "/#testimonials",
      label: "Testimonials",
    },
    {
      href: "/#pricing",
      label: "Pricing",
    },
    {
      href: "/#faq",
      label: "FAQ",
    },
  ];
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a href="/" className="font-bold text-xl flex">
            <LogoIcon />
            ShadcnUI/React
          </a>
        </div>

        <div className="flex flex-col gap-2">
          {routeList.map(({ href, label }) => (
            <div key={href}>
              <a href={href} className="opacity-60 hover:opacity-100">
                {label}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>&copy; 2024 Flexnote</h3>
      </section>
    </footer>
  );
};
