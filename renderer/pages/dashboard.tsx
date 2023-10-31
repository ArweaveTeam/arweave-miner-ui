import React from "react";
import { MainLayout } from "../layouts";
import parsePrometheusTextFormat from 'parse-prometheus-text-format';
import { Arweave_API } from "../lib/arweave";
import { setMinorState, selectMinorState } from "../store/minorSlice";
import { useDispatch, useSelector } from "react-redux";
import { MinorParser } from "../types/Minor";

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

    const [data, setData] = React.useState(null);
    const menuItems: MenuItems[] = [
        {
            label: 'Core',
            target: 'section-1',
            subMenuItems: [
                { label: 'Data Related', target: 'sub-section-1-1' },
                { label: 'Hash Rate', target: 'sub-section-1-2' },
                { label: 'Earnings', target: 'sub-section-1-3' },
            ],
        },
        {
            label: 'Advanced',
            target: 'section-2',
            subMenuItems: [
                { label: 'Performance', target: 'sub-section-2-1' },
                { label: 'Debug', target: 'sub-section-2-2' },
                { label: 'Raw Logs', target: 'sub-section-2-3' },
            ],
        },
    ];

    const [activeMenuItem, setActiveMenuItem] = React.useState<string>(menuItems[0].target);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const sectionOffsets: any[] = menuItems.flatMap((item: MenuItems) => [
            document.getElementById(item.target).offsetTop - 100,
            ...(item.subMenuItems || []).map((subItem: SubMenuItems) => document.getElementById(subItem.target)?.offsetTop - 100),
        ]);

        const tempMenuList = menuItems.flatMap((item: MenuItems) => [
            item,
            ...(item.subMenuItems || []).map((subItem: SubMenuItems) => subItem),
        ]);

        const activeIndex: number = sectionOffsets.findIndex(offset => offset > scrollPosition);
        setActiveMenuItem(() => {
            const activeMenu = tempMenuList[activeIndex > tempMenuList.length ? activeIndex - 1 : activeIndex];
            return activeMenu.target || activeMenu[0].target;
        });
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [menuItems]);

    React.useEffect(() => {
        (async () => {
            const res = await Arweave_API.api.get('/metrics');
            const data = res.data;
            const parsed: MinorParser[] = parsePrometheusTextFormat(data);
            // console.log(parsed);
            const data_packaged = parsed.find((item: any) => item.name === 'v2_index_data_size_by_packing')?.metrics[0].value;
            const hash_rate = parsed.find((item: any) => item.name === 'average_network_hash_rate').metrics[0].value;
            const earnings = parsed.find((item: any) => item.name === 'average_block_reward').metrics[0].value;

            dispatch(setMinorState({
                data_packaged,
                hash_rate,
                earnings,
            }));


            setData(data);
        })()
    }, []);

    return (
        <MainLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:w-1/4 px-4">
                        <nav className="sticky top-0 pt-4">
                            <ul className="space-y-2">
                                {menuItems.map((item: MenuItems) => (
                                    <li key={item.target}>
                                        <a
                                            href={`#${item.target}`}
                                            className={`block font-medium py-2 hover:text-gray-900 transition duration-150 ${activeMenuItem === item.target ? 'text-gray-900 border-l-4 border-gray-900 pl-3' : 'text-gray-600'}`}
                                        >
                                            {item.label}
                                        </a>
                                        {item.subMenuItems && (
                                            <ul className="pl-4 space-y-2">
                                                {item.subMenuItems.map((subItem: SubMenuItems) => (
                                                    <li key={subItem.target}>
                                                        <a
                                                            href={`#${subItem.target}`}
                                                            className={`block font-medium py-2 hover:text-gray-900 transition duration-150 ${activeMenuItem === subItem.target ? 'text-gray-900 border-l-4 border-gray-900 pl-3' : 'text-gray-600'}`}
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
                    <div className="md:w-3/4 px-4">
                        <section id="section-1" className="mb-8 h-screen">
                            <h2 className="text-2xl font-bold mb-4">Core</h2>
                            <div className="space-y-4">
                                <div id="sub-section-1-1" className="bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-2">Data Related</h3>
                                    <p className="text-gray-700">Data packaged: {minorState.data_packaged}</p>
                                </div>
                                <div id="sub-section-1-2" className="bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-2">Hash Rate</h3>
                                    <p className="text-gray-700">Hash rate: {minorState.hash_rate}</p>
                                </div>
                                <div id="sub-section-1-3" className="bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-2">Earnings</h3>
                                    <p className="text-gray-700">Earnings: {minorState.earnings}</p>
                                </div>
                            </div>
                        </section>
                        <section id="section-2" className="mb-8 h-screen">
                            <h2 className="text-2xl font-bold mb-4">Advanced</h2>
                            <div className="space-y-4">
                                <div id="sub-section-2-1" className="bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-2">Performance</h3>
                                    <p className="text-gray-700">Performance data goes here.</p>
                                </div>
                                <div id="sub-section-2-2" className="bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-2">Debug</h3>
                                    <p className="text-gray-700">Debug data goes here.</p>
                                </div>
                                <div id="sub-section-2-3" className="bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-2">Raw Logs</h3>
                                    <p className="text-gray-700">Raw logs go here.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
