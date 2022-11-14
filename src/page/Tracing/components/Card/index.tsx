import { Descriptions } from 'antd';

export default function blockCard(props: any) {
    console.log(props)
    const { sourceFileId, fileName, result, fileHash, chainHash, targetServerId, targetPath, consumedTime } = props
    return (
        <Descriptions bordered column={1} >
            <Descriptions.Item label="源文件id">{sourceFileId}</Descriptions.Item>
            <Descriptions.Item label="文件名">{fileName}</Descriptions.Item>
            <Descriptions.Item label="备份服务器id">{targetServerId}</Descriptions.Item>
            <Descriptions.Item label="备份服务器路径">{targetPath}</Descriptions.Item>
            <Descriptions.Item label="备份时长">{consumedTime}分钟</Descriptions.Item>
            <Descriptions.Item label="文件哈希">{fileHash}</Descriptions.Item>
            {!result && <Descriptions.Item label="链上哈希">{chainHash}</Descriptions.Item>}
        </Descriptions>
    )
}
