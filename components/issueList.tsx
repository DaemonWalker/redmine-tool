'use client'

import { FC, useEffect, useMemo, useState } from "react";
import { List } from 'antd';
import { Issue } from "@/model/save";
import { getIssuesAtClient } from "@/service/redmineClient";
import { IssueCard } from "./issueCard";
import useIssueStore from "@/store/issueStore";
import useFilterStore from "@/store/filterStore";

interface IState {
    save: Issue[]
}

export const IssueList: FC<IState> = ({ save }) => {
    const { data, issues, setIssues, setData } = useIssueStore();
    const { id, backlog, assignee } = useFilterStore();
    useEffect(() => setData(save), [save])
    useEffect(() => {
        if (data) {
            getIssuesAtClient(data.map(p => p.id)).then(res => {
                setIssues(res);
            })
        }
    }, [data])
    const source = useMemo(() => {
        let d = data
        if (id && id.length > 0) {
            d = d.filter(p => p.id.indexOf(id) > -1);
        }
        if (backlog && backlog.length > 0) {
            d = d.filter(p => p.backlog.indexOf(backlog) > -1);
        }
        if (assignee && assignee.length > 0) {
            d = d.filter(p => assignee.filter(q => p.assignee.includes(q)).length > 0);
        }
        const ids = d.map(d => d.id);
        return issues.filter(p => ids.includes(p.id));
    }, [issues, data, id, backlog, assignee])

    return (
        <List
            grid={{ gutter: 12, column: 3 }}
            dataSource={source}
            loading={!issues && !data}
            renderItem={(item) => {
                return (<List.Item key={item.id}>
                    <IssueCard issue={item} data={data.find(p => p.id === `${item.id}`)!} />
                </List.Item>)
            }}
            style={{ padding: "0px 24px" }}
        />
    )
}