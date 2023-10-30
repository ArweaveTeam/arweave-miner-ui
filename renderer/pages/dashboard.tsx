import React from "react";
import { MainLayout } from "../layouts";
import parsePrometheusTextFormat from 'parse-prometheus-text-format';
import { Arweave_API } from "../lib/arweave";
import { setMinorState, selectMinorState } from "../store/minorSlice";
import { useDispatch, useSelector } from "react-redux";
import { MinorParser } from "../types/Minor";

export default function DashboardPage() {
    const minorState = useSelector(selectMinorState);
    const dispatch = useDispatch();

    const [data, setData] = React.useState(null);
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
            <div className="min-h-screen w-full flex">
                <div className="w-64 p-4">
                    sidebar menu
                </div>

                <div className="border-l border-l-gray-300 p-4 w-full overflow-clip">
                    {JSON.stringify(minorState)};
                </div>
            </div>
        </MainLayout>
    );
}
