import React from "react";
import { MainLayout } from "../layouts";
import { setMinorState, selectMinorState } from "../store/minorSlice";
import { useDispatch, useSelector } from "react-redux";
import ScrollSpy from "react-ui-scrollspy";
import DataRelated from "../components/Charts/DataRelated";
import { Metrics } from "../types/Minor";
import { DataRelatedChart } from "../types/Charts";
import { convertToGbFromPetabytes } from "../util/minor";

interface MenuItems {
  label: string;
  target: string;
  subMenuItems?: SubMenuItems[];
}
interface SubMenuItems {
  label: string;
  target: string;
}

export default function DashboardPage() {
  const minorState = useSelector(selectMinorState);
  const dispatch = useDispatch();
  const [dataRelated, setDataRelated] = React.useState<DataRelatedChart>({
    data_package: {
      size: 0,
      unit: "GB",
    },
    storage_available: {
      size: 0,
      unit: "GB",
    },
    total_size: {
      size: 0,
      unit: "TB",
    },
  });

  const [activeMenu, setActiveMenu] = React.useState<string>();

  const menuItems: MenuItems[] = [
    {
      label: "Core",
      target: "section-1",
      subMenuItems: [
        { label: "Data Related", target: "sub-section-1-1" },
        { label: "Hash Rate", target: "sub-section-1-2" },
        { label: "Earnings", target: "sub-section-1-3" },
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

  React.useEffect(() => {
    (async () => {
      const data: Metrics = await window.ipc.requestMetrics();
      console.log("requestMetrics", data);
      if (data) {
        dispatch(setMinorState(data));

        setDataRelated((prev) => {
          return {
            ...prev,
            data_package: {
              size: convertToGbFromPetabytes(data.data_packaged) || 0,
              unit: "GB",
            },
            storage_available: {
              size: convertToGbFromPetabytes(data.data_unpackaged) || 0,
              unit: "GB",
            },
            total_size: {
              size: data.data_packaged + data.data_unpackaged,
              unit: "TB",
            },
          };
        });
      }
    })();
  }, []);

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = window.document.getElementById(e.currentTarget.href.split("#")[1]);

    setActiveMenu(e.currentTarget.href.split("#")[1]);
    if (target) {
      const headerOffset = 20;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScrollUpdate = (target: string) => {
    setActiveMenu(target);
  };

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

        <div className="md:w-3/4 px-4 border-l border-gray-300 pt-8">
          <ScrollSpy
            useBoxMethod={true}
            activeClass={"active-scrollspy-menu"}
            onUpdateCallback={handleScrollUpdate}
          >
            <section id="section-1" className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Core</h2>
              <div className="space-y-4">
                <div id="sub-section-1-1" className="bg-gray-100 p-4 rounded-lg h-64">
                  <h3 className="text-lg font-medium mb-2">Data Related</h3>
                  <DataRelated
                    data_package={dataRelated.data_package}
                    storage_available={dataRelated.storage_available}
                    total_size={dataRelated.total_size}
                  />
                </div>
                <div id="sub-section-1-2" className="bg-gray-100 p-4 rounded-lg h-64">
                  <h3 className="text-lg font-medium mb-2">Hash Rate</h3>
                  <p className="text-gray-700">Hash rate: {minorState.hash_rate}</p>
                </div>
                <div id="sub-section-1-3" className="bg-gray-100 p-4 rounded-lg h-64">
                  <h3 className="text-lg font-medium mb-2">Earnings</h3>
                  <p className="text-gray-700">Earnings: {minorState.earnings}</p>
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
