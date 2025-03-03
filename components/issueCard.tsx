import { Issue } from "@/model/save"
import { getLastUpdated } from "@/service/redmineClient";
import { App, Avatar, Card } from "antd"
import { EditFilled, AlertFilled, EyeFilled, DeleteFilled } from '@ant-design/icons';
import useEditorStore from "@/store/editorStore";
import { FC, useMemo } from "react";
import useDeleteConfirmModalStore from "@/store/deleteConfirmModalStore";
import useSeenStore from "@/store/seenStore";


const { Meta } = Card

function hashString(strs: string[]) {
    let hash = 0;
    for (let i = 0; i < strs.length; i++) {
        const str = strs[i];
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
    }
    return hash;
}

// 根据哈希值生成颜色
function getColorFromHash(hash: number) {
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;
    return `rgb(${r}, ${g}, ${b})`;
}



interface IState {
    issue: any,
    data: Issue
}

const iconSize = { "fontSize": '1.65em' }

export const IssueCard: FC<IState> = ({ issue, data }) => {
    const { openEditor } = useEditorStore();
    const { setOpen } = useDeleteConfirmModalStore();
    const { seen, setSeen } = useSeenStore();

    const lastUpdate = useMemo(() => getLastUpdated(issue), [issue])
    const color = useMemo(() => {
        const assignee = data.assignee;
        const hash = hashString(assignee);
        return getColorFromHash(hash);
    }, [data])

    const alert = useMemo(() => {
        const date = seen[issue.id]
        const lastUpdate = getLastUpdated(issue);
        const alert = !date || date < lastUpdate.at;
        if (alert) {
            return <AlertFilled style={{ color: 'red', ...iconSize }} onClick={() => setSeen(issue.id, lastUpdate.at)} size={400} />
        } else {
            return <EyeFilled style={{ color: 'green', ...iconSize }} />
        }
    }, [seen, issue])

    return (
        <Card title={`Redmine-${issue.id}`} extra={<a href="#">{`Backlog-${data?.backlog}`}</a>}
            actions={[
                alert,
                <EditFilled key="edit" onClick={() => openEditor('edit', data)} style={iconSize} />,
                <DeleteFilled key="delete" onClick={() => setOpen(true, issue.id)} style={iconSize} />]} >
            <Meta
                avatar={<Avatar style={{ backgroundColor: color }} size={60}>{data.assignee}</Avatar>}
                title={issue.subject}
                description={<>
                    <p>{`${lastUpdate.by} ${lastUpdate.at.toLocaleString()}`}</p>
                </>}
            />
        </Card>
    )
}