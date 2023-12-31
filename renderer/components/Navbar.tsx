import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import isElectron from "is-electron";
import { useAppDispatch } from "../store";
import { AddMiner } from "./add-miner/add-miner";
import { SelectMinerDropdown } from "./select-miner/select-miner-dropdown";
import { ASSET } from "./Asset";
import { getNodes } from "../store/configSlice/configSlice";
import { useConfigNodes } from "../store/configSlice/configSliceHooks";
import { useEffect } from "react";

interface NavLink {
  href: string;
  label: string;
  target?: string;
}

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const nodes = useConfigNodes();

  useEffect(() => {
    dispatch(getNodes());
  }, [dispatch]);

  const links: NavLink[] = [
    {
      href: "/home",
      label: "Home",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/monitor",
      label: "Monitor",
    },
    {
      href: "/learn",
      label: "Learn",
    },
    {
      href: "/docs",
      label: "Docs",
    },
    {
      href: "/discord",
      label: "Discord",
      target: "https://discord.gg/mRbVUwJxAH",
    },
  ];

  const NavLink = ({ href, label, target }: NavLink) => {
    return (
      <Link
        href={href}
        onClick={(event) => {
          if (isElectron() && target) {
            event.preventDefault();
            window.ipc.send("open-url", target);
          } else if (target) {
            window.history.pushState({}, "", target);
          }
        }}
        className={`block px-5 py-2 rounded hover:bg-gray-200 ${
          router.pathname == href ? "font-medium bg-gray-200" : "font-light"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="w-full">
      <nav className="fixed w-full z-20 top-0 left-0 border-b border-gray-300 bg-[#F1F1F1]">
        <div className="flex whitespace-nowrap items-center justify-between p-4 px-10">
          <Link href="/home" className="flex items-center">
            <img src={ASSET.ArweaveLogo} alt="arweave-logo" className="w-8 h-8 mr-2" />
          </Link>

          <div className="flex md:order-2 gap-2">
            {nodes.length > 0 ? <SelectMinerDropdown /> : <AddMiner withButton />}
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden text-gray-950 border border-gray-950 hover:bg-gray-950 hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-2 md:mt-0">
              {links.map((link, index) => {
                return (
                  <NavLink key={index} href={link.href} label={link.label} target={link.target} />
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
