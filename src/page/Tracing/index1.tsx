// import React from "react";
import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react'
import G6 from '@antv/g6';
import { useHistory } from 'react-router-dom';
import store from '../../redux/store';


export default function Tracing() {
  const history = useHistory();
  (store.getState().persistIsLogin as any).mode !== 'true' && history.replace('/');

  const ref: any = useRef(null);
  let graph: any = null;

  const data = {
    // 点集
    nodes: [
      {
        id: 'log0', // 节点的唯一标识
        x: 50, // 节点横坐标
        y: 50, // 节点纵坐标
        sourceFileId: 17,
        fileName: "msg666.conf",
        result: 0,
        fileHash: "d73127c21f3e05fc862c6d14518758f46338e92fe70ff4538fc1b2ad3131c2de",
        chainHash: "55e55a6242668d365ca0c4b8dcb673649d6c4802eab9520a44161c805cc99f73",
        targetServerId: 2,
        targetPath: "/222/222",
        startTime: "2022-11-07 18:42:27",
        endTime: "2022-11-07 18:43:27",
        consumedTime: 1,
        type: 'rect-xml'
      },
      {
        id: 'log1', // 节点的唯一标识
        x: 50, // 节点横坐标
        y: 350, // 节点纵坐标
        sourceFileId: 17,
        fileName: "msg666.conf",
        result: 0,
        fileHash: "d73127c21f3e05fc862c6d14518758f46338e92fe70ff4538fc1b2ad3131c2de",
        chainHash: "55e55a6242668d365ca0c4b8dcb673649d6c4802eab9520a44161c805cc99f73",
        targetServerId: 2,
        targetPath: "/222/222",
        startTime: "2022-11-07 18:42:27",
        endTime: "2022-11-07 18:43:27",
        consumedTime: 1,
        type: 'rect-xml'
      },
      {
        id: 'log2', // 节点的唯一标识
        x: 50, // 节点横坐标
        y: 650, // 节点纵坐标
        sourceFileId: 17,
        fileName: "msg666.conf",
        result: 0,
        fileHash: "d73127c21f3e05fc862c6d14518758f46338e92fe70ff4538fc1b2ad3131c2de",
        chainHash: "55e55a6242668d365ca0c4b8dcb673649d6c4802eab9520a44161c805cc99f73",
        targetServerId: 2,
        targetPath: "/222/222",
        startTime: "2022-11-07 18:42:27",
        endTime: "2022-11-07 18:43:27",
        consumedTime: 1,
        type: 'rect-xml'
      },
      {
        id: 'log3', // 节点的唯一标识
        x: 50, // 节点横坐标
        y: 950, // 节点纵坐标
        sourceFileId: 17,
        fileName: "msg666.conf",
        result: 0,
        fileHash: "d73127c21f3e05fc862c6d14518758f46338e92fe70ff4538fc1b2ad3131c2de",
        chainHash: "55e55a6242668d365ca0c4b8dcb673649d6c4802eab9520a44161c805cc99f73",
        targetServerId: 2,
        targetPath: "/222/222",
        startTime: "2022-11-07 18:42:27",
        endTime: "2022-11-07 18:43:27",
        consumedTime: 1,
        type: 'rect-xml'
      }
    ],
    // 边集
    edges: [
      // 表示一条从 node1 节点连接到 node2 节点的边
      {
        id: '0',
        source: 'log0', // 起始点 id
        target: 'log1', // 目标点 id
        sourceAncho: [0.5,1],
        targetAnchor:[0.5,0]
      },
      {
        id: '1',
        source: 'log1', // 起始点 id
        target: 'log2', // 目标点 id
        sourceAncho: [0.5,1],
        targetAnchor:[0.5,0]
      },
      {
        id: '2',
        source: 'log2', // 起始点 id
        target: 'log3', // 目标点 id
        sourceAncho: [0.5,1],
        targetAnchor:[0.5,0]
      },
    ],
  };

  G6.registerNode(
    'rect-xml',
    (cfg) => `
    <rect 
      style={{
        width: 750, 
        height: 188, 
        fill: 'rgba(24,144,255,0.15', 
        radius: 6
      }}>
      <rect 
        style={{
          width: 750, 
          height: 40, 
          fill: '#1890ff', 
          radius: [6,6,0,0]
        }}>
        <text
          style={{
            fill: '#fff',
            textAlign: 'center',
            fontSize: 20,
            marginTop: 40,
            marginLeft: 8,
            fontWeight: 'bold'
          }}>
          ${cfg.id}
        </text>         
      </rect>
      <text style={{marginLeft: 8, marginTop: 8, fontSize: 16}}>文件名：${cfg.fileName}</text>
      <text style={{marginLeft: 8, marginTop: 12, fontSize: 16}}>文件哈希：${cfg.fileHash}</text>
      <text style={{marginLeft: 8, marginTop: 16, fontSize: 16}}>链上哈希：${cfg.chainHash}</text>
      <text style={{marginLeft: 8, marginTop: 20, fontSize: 16}}>备份服务器id：${cfg.targetServerId}</text>
      <text style={{marginLeft: 8, marginTop: 24, fontSize: 16}}>备份服务器路径：${cfg.targetPath}</text>
      <text style={{marginLeft: 8, marginTop: 26, fontSize: 16}}>开始备份时间：${cfg.startTime}</text>
      <text style={{marginLeft: 8, marginTop: 28, fontSize: 16}}>备份持续时间：${cfg.consumedTime}分钟</text>
    </rect>
  `,
  );

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current) as any,
        width: 1200,
        height: 1200,
        modes: {
          default: ['drag-canvas'],
        },
        fitCenter: false,
      });
    }
    graph.data(data);
    graph.render();
  }, []);
  return (
    <>
      
      <div ref={ref}></div>
    </>
  );
}