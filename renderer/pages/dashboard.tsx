import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ScrollSpy from "react-ui-scrollspy";
import isElectron from "is-electron";
import { MainLayout } from "../layouts/MainLayout";
import {
  useEarnings,
  useHashRate,
  useAvgBlockReward,
} from "../store/metricsSlice/metricsSliceHooks";
import { setMetricsState } from "../store/metricsSlice/metricsSlice";
import { SetMetricsStateActionPayload } from "../../types/metrics";
import DataRelated from "../components/DataRelated";

interface MenuItems {
  label: string;
  target: string;
  subMenuItems?: SubMenuItems[];
}
interface SubMenuItems {
  label: string;
  target: string;
}

const menuItems: MenuItems[] = [
  {
    label: "Core",
    target: "section-1",
    subMenuItems: [
      { label: "Data Related", target: "sub-section-1-1" },
      { label: "Hash Rate", target: "sub-section-1-2" },
      { label: "Earnings", target: "sub-section-1-3" },
      { label: "Average Block Reward", target: "sub-section-1-4" },
    ],
  },
  {
    label: "Advanced",
    target: "section-2",
    subMenuItems: [
      { label: "Performance", target: "sub-section-2-1" },
      { label: "Debug", target: "sub-section-2-2" },
      { label: "Raw Logs", target: "sub-section-2-3" },
    ],
  },
];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { hashRate } = useHashRate();
  const { earnings } = useEarnings();
  const { avgBlockReward } = useAvgBlockReward();

  const [activeMenu, setActiveMenu] = useState<string>();

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      const target = window.document.getElementById(event.currentTarget.href.split("#")[1]);

      setActiveMenu(event.currentTarget.href.split("#")[1]);
      if (target) {
        const headerOffset = 20;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollBy({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    [setActiveMenu],
  );

  const handleScrollUpdate = useCallback(
    (target: string) => {
      setActiveMenu(target);
    },
    [setActiveMenu],
  );

  const handler = useCallback(
    (_event: unknown, data: SetMetricsStateActionPayload) => {
      console.log("DEBUG: requestMetrics", data);
      dispatch(setMetricsState(data));
    },
    [dispatch, setMetricsState],
  );

  useEffect(() => {
    if (isElectron()) {
      window.ipc.metricsSub(handler);
      return () => {
        window.ipc.metricsUnsub(handler);
      };
    }
  }, [handler]);

  return (
    <MainLayout>
      <div className="w-full flex px-6">
        <div className="px-4 w-64 relative">
          <nav className="sticky top-14 pt-8">
            <ul className="space-y-2">
              {menuItems.map((item: MenuItems) => (
                <li key={item.target} className="pl-6">
                  <a onClick={handleMenuClick} href={`#${item.target}`}>
                    <div
                      data-to-scrollspy-id={item.target}
                      className={`block py-2 hover:text-gray-900 transition duration-150 not-active-scrollspy-menu`}
                    >
                      {item.label}
                    </div>
                  </a>
                  {item.subMenuItems && (
                    <ul className="pl-4 space-y-2">
                      {item.subMenuItems.map((subItem: SubMenuItems) => (
                        <li key={subItem.target}>
                          <a
                            onClick={handleMenuClick}
                            href={`#${subItem.target}`}
                            className={`block py-2 text-gray-400 hover:font-medium transition duration-150 ${
                              item.target == activeMenu ? "text-gray-900" : ""
                            }`}
                          >
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="w-full px-4 border-l border-gray-300 pt-8">
          <ScrollSpy
            useBoxMethod={true}
            activeClass={"active-scrollspy-menu"}
            onUpdateCallback={handleScrollUpdate}
          >
            <section id="section-1" className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Core</h2>

              <div className="space-y-4">
                <DataRelated />
                <div id="sub-section-1-2" className="bg-gray-100 p-4 rounded-lg h-64">
                  <h3 className="text-lg font-medium mb-2">Hash Rate</h3>
                  {typeof hashRate === "number" && (
                    <p className="text-gray-700">Hash rate: {hashRate.toFixed(2)}</p>
                  )}
                </div>
                <div id="sub-section-1-3" className="bg-gray-100 p-4 rounded-lg h-64">
                  <h3 className="text-lg font-medium mb-2">Earnings</h3>
                  {typeof earnings === "number" && (
                    <p className="text-gray-700">Earnings: {earnings} AR</p>
                  )}
                </div>
                <div id="sub-section-1-4" className="bg-gray-100 p-4 rounded-lg h-64">
                  <h3 className="text-lg font-medium mb-2">Average Block Reward</h3>
                  {typeof avgBlockReward === "number" && (
                    <p className="text-gray-700">
                      Average Block Reward: {(avgBlockReward / 1e12).toFixed(4)} AR
                    </p>
                  )}
                </div>
              </div>
            </section>
            <section id="section-2" className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Advanced</h2>
              <div className="space-y-4">
                <div id="sub-section-2-1" className="bg-gray-100 p-4 rounded-lg h-64">
                  <h3 className="text-lg font-medium mb-2">Performance</h3>
                  <p className="text-gray-700">Performance data goes here.</p>
                </div>
                <div id="sub-section-2-2" className="bg-gray-100 p-4 rounded-lg h-64">
                  <h3 className="text-lg font-medium mb-2">Debug</h3>
                  <p className="text-gray-700">Debug data goes here.</p>
                </div>
                <div id="sub-section-2-3" className="bg-gray-100 p-4 rounded-lg h-64">
                  <h3 className="text-lg font-medium mb-2">Raw Logs</h3>
                  <p className="text-gray-700">Raw logs go here.</p>
                </div>
              </div>
            </section>
          </ScrollSpy>
        </div>
      </div>
    </MainLayout>
  );
}
