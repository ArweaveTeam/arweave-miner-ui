import React from "react";
import { filesize } from "filesize/dist/filesize.esm.js";
import { MainLayout } from "../layouts/MainLayout";

interface tooltipHeaderOpt {
  title: string;
  hint_fn: () => React.ReactElement;
}
function tooltipHeader(opt: tooltipHeaderOpt) {
  // TODO use opt.hint_fn
  return <th>{opt.title}</th>;
}

interface Node {
  ip: string;
  downloaded_size_bn: bigint;
  sm_avail_size_bn: bigint;
  dl_speed: number;
  ul_speed: number;
  hashrate: number;
  h1: number;
  h2: number;
  h2_cm: number;
  vdf: number;
  start_ts: number;
  is_alive: boolean;
  smart_status: string;
}

export default function MonitorPage() {
  // TODO style
  // TODO data feed with real data
  //   But keep test data feed (so it will be possible see all component states)
  const sample_node: Node = {
    ip: "192.168.1.10",
    // typescript or I a bit dumb
    // downloaded_size_bn: 100n * 1024n ** 4n,
    // sm_avail_size_bn: 120n * 1024n ** 4n,
    downloaded_size_bn: 109951162777600n,
    sm_avail_size_bn: 131941395333120n,
    dl_speed: 1e6,
    ul_speed: 1e3,
    hashrate: 5678,
    h1: 5000,
    h2: 78,
    h2_cm: 600,
    vdf: 1.2,
    start_ts: Date.now(),
    is_alive: true,
    smart_status: "OK",
  };
  const nodeList: Node[] = [];
  for (let i = 10; i < 20; i++) {
    const node: Node = Object.assign({}, sample_node);
    node.ip = `192.168.1.${i}`;
    nodeList.push(node);
  }

  nodeList.push({
    ip: "192.168.1.250",
    // downloaded_size_bn: 100n * 1024n ** 2n,
    // sm_avail_size_bn: 100n * 1024n ** 3n,
    downloaded_size_bn: 104857600n,
    sm_avail_size_bn: 104857600n,
    dl_speed: 100e6,
    ul_speed: 0,
    hashrate: 10,
    h1: 10,
    h2: 0,
    h2_cm: 0,
    vdf: 5,
    start_ts: Date.now(),
    is_alive: false,
    smart_status: "1 HDD fail",
  });

  // I am not sure that this function works ok
  // I only know original fmt_size worked fine
  const fmtSize = (value: bigint) => filesize(Number(value), { standard: "si" });
  // TODO
  const fmtHashrate = (value: number) => value.toString();
  // TODO
  const fmtNetSpeed = (value: number) => value.toString();
  // TODO
  const fmtTimestampDiff = (value: number) => value.toString();

  let total_downloaded_size_bn = 0n;
  let total_sm_avail_size_bn = 0n;
  let total_hashrate = 0;
  let total_h1 = 0;
  let total_h2 = 0;
  let total_h2_cm = 0;
  let total_dl_speed = 0;
  let total_ul_speed = 0;

  const numCellStyle: React.CSSProperties = {
    textAlign: "right",
  };

  const now = Date.now();
  // TODO refresh each second

  const reactNodeList = nodeList.map((node, index) => {
    if (node.is_alive) {
      total_downloaded_size_bn += node.downloaded_size_bn;
      total_sm_avail_size_bn += node.sm_avail_size_bn;
      total_hashrate += node.hashrate;
      total_h1 += node.h1;
      total_h2 += node.h2;
      total_h2_cm += node.h2_cm;
      total_dl_speed += node.dl_speed;
      total_ul_speed += node.ul_speed;
    }
    return (
      <tr key={index} className={!node.is_alive ? "warning" : undefined}>
        <td>{node.ip}</td>
        <td style={numCellStyle}>{fmtSize(node.downloaded_size_bn)}</td>
        <td style={numCellStyle}>{fmtSize(node.sm_avail_size_bn)}</td>
        <td style={numCellStyle}>{fmtHashrate(node.hashrate)}</td>
        <td style={numCellStyle}>{fmtHashrate(node.h1)}</td>
        <td style={numCellStyle}>{fmtHashrate(node.h2)}</td>
        <td style={numCellStyle}>{fmtHashrate(node.h2_cm)}</td>
        <td style={numCellStyle}>{fmtNetSpeed(node.dl_speed)}</td>
        <td style={numCellStyle}>{fmtNetSpeed(node.ul_speed)}</td>
        <td style={numCellStyle}>{node.vdf.toFixed(2)}</td>
        <td></td>
        <td></td>
        <td style={numCellStyle}>{node.smart_status}</td>
        <td style={numCellStyle}>{fmtTimestampDiff(now - node.start_ts)}</td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="w-full">
        <div className="max-w-screen-xl mx-auto p-4 h-[90vh]">
          <div className="flex flex-col items-start justify-center h-full">
            <h1 className="text-3xl font-medium mb-2 tracking-wide">Monitor</h1>

            <table
              style={{
                fontFamily: "monospace",
              }}
            >
              <tbody>
                <tr>
                  <th>IP</th>
                  {tooltipHeader({
                    title: "DL size",
                    hint_fn: () => {
                      return <span>Downloaded size</span>;
                    },
                  })}
                  {tooltipHeader({
                    title: "Disk space",
                    hint_fn: () => {
                      return (
                        <>
                          <div>
                            <span>Total storage modules </span>
                          </div>
                          <div>
                            <b>declared</b>
                            <span> space</span>
                          </div>
                        </>
                      );
                    },
                  })}
                  {tooltipHeader({
                    title: "Hashrate",
                    hint_fn: () => {
                      return (
                        <>
                          <div>
                            <span>Hashrate =</span>
                          </div>
                          <div>
                            <span>H1 + H2 + CM H2</span>
                          </div>
                        </>
                      );
                    },
                  })}
                  {tooltipHeader({
                    title: "H1",
                    hint_fn: () => {
                      return <span>Hashrate for H1</span>;
                    },
                  })}
                  {tooltipHeader({
                    title: "H2",
                    hint_fn: () => {
                      return (
                        <>
                          <div>
                            <span>Hashrate for H2</span>
                          </div>
                          <div>
                            <span>only </span>
                            <b>own</b>
                            <span> H2</span>
                          </div>
                        </>
                      );
                    },
                  })}
                  {tooltipHeader({
                    title: "CM H2",
                    hint_fn: () => {
                      return (
                        <>
                          <div>
                            <span>Hashrate for H2</span>
                          </div>
                          <div>
                            <span>only </span>
                            <b>coordinated mining</b>
                            <span> H2</span>
                          </div>
                        </>
                      );
                    },
                  })}
                  {tooltipHeader({
                    title: "DL",
                    hint_fn: () => {
                      return (
                        <>
                          <span>Download speed</span>
                          <div>
                            <span>(</span>
                            <b>bytes</b>
                            <span> per second)</span>
                          </div>
                        </>
                      );
                    },
                  })}
                  {tooltipHeader({
                    title: "UL",
                    hint_fn: () => {
                      return (
                        <>
                          <span>Upload speed</span>
                          <div>
                            <span>(</span>
                            <b>bytes</b>
                            <span> per second)</span>
                          </div>
                        </>
                      );
                    },
                  })}
                  {tooltipHeader({
                    title: "VDF",
                    hint_fn: () => {
                      return <span>VDF time in seconds</span>;
                    },
                  })}
                  {tooltipHeader({
                    title: "CPU",
                    hint_fn: () => {
                      return (
                        <>
                          <span>CPU usage</span>
                          <div>
                            <span>(available only in ssh-mode)</span>
                          </div>
                        </>
                      );
                    },
                  })}
                  {tooltipHeader({
                    title: "RAM",
                    hint_fn: () => {
                      return (
                        <>
                          <span>System memory usage</span>
                          <div>
                            <span>(available only in ssh-mode)</span>
                          </div>
                        </>
                      );
                    },
                  })}
                  {tooltipHeader({
                    title: "SMART",
                    hint_fn: () => {
                      return (
                        <>
                          <div>HDD S.M.A.R.T.</div>
                          <div>monitor status</div>
                          <div>
                            <span>(available only in ssh-mode)</span>
                          </div>
                        </>
                      );
                    },
                  })}
                  {tooltipHeader({
                    title: "uptime",
                    hint_fn: () => {
                      return (
                        <>
                          <span>uptime from last </span>
                          <b>node</b>
                          <span> restart</span>
                        </>
                      );
                    },
                  })}
                </tr>
                {reactNodeList}
                <tr>
                  <th style={numCellStyle}>Total</th>
                  <th style={numCellStyle}>{fmtSize(total_downloaded_size_bn)}</th>
                  <th style={numCellStyle}>{fmtSize(total_sm_avail_size_bn)}</th>
                  <th style={numCellStyle}>{fmtHashrate(total_hashrate)}</th>
                  <th style={numCellStyle}>{fmtHashrate(total_h1)}</th>
                  <th style={numCellStyle}>{fmtHashrate(total_h2)}</th>
                  <th style={numCellStyle}>{fmtHashrate(total_h2_cm)}</th>
                  <th style={numCellStyle}>{fmtNetSpeed(total_dl_speed)}</th>
                  <th style={numCellStyle}>{fmtNetSpeed(total_ul_speed)}</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
