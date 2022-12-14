import { Descriptions, Button, message } from 'antd';
import { useState } from 'react'

export default function BlockCard(props: any) {
    const [isLoading, setIsLoading] = useState(false)
    const { sourceFileId, fileName, result, fileHash, chainHash, targetServerId, targetPath, consumedTime } = props
    return (
        <>
            <Descriptions bordered column={1} >
                <Descriptions.Item label="源文件id">{sourceFileId}</Descriptions.Item>
                <Descriptions.Item label="文件名">{fileName}</Descriptions.Item>
                <Descriptions.Item label="备份服务器id">{targetServerId}</Descriptions.Item>
                <Descriptions.Item label="备份服务器路径">{targetPath}</Descriptions.Item>
                <Descriptions.Item label="备份时长">{consumedTime}分钟</Descriptions.Item>
                <Descriptions.Item label="文件哈希">{fileHash}</Descriptions.Item>
                {!result && <Descriptions.Item label="链上哈希">{chainHash}</Descriptions.Item>}
            </Descriptions>
            <Button type="primary" loading={isLoading} block style={{ marginTop: '10px' }} onClick={
                () => {
                    setIsLoading(true)
                    setTimeout(()=>{
                        message.success({
                            style: {
                                marginTop: '100px'
                            },
                            content: '还原成功！'
                        });
                        setIsLoading(false)
                    }, 1000)
                }
            }>还原文件</Button>
        </>

    )
}
