'use client'
import React, { useMemo } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import useFilterStore from '../store/filterStore';
import useEditorStore from '@/store/editorStore';
import useIssueStore from '@/store/issueStore';

const opts = {
    "allowClear": true,
    "style": {
        "width": 300,
    },
}

export const ListFilter: React.FC = () => {
    const { setId, setBacklog, setAssignee } = useFilterStore();
    const { data, assigneeOptions } = useIssueStore();
    const { openEditor } = useEditorStore();
    const options = useMemo(() => assigneeOptions(data), [data]);
    return (
        <Form
            name="filterForm"
            layout="inline"
        >
            <Form.Item label="ID" name="id">
                <Input placeholder="Redmine ID" onChange={e => setId(e.target.value)} {...opts} />
            </Form.Item>

            <Form.Item label="Backlog" name="backlog">
                <Input placeholder="Backlog Id" onChange={e => setBacklog(e.target.value)} {...opts} />
            </Form.Item>

            <Form.Item label="Assignee" name="assignee">
                <Select
                    mode="multiple"
                    placeholder="请选择 Assignee"
                    onChange={value => setAssignee(value)}
                    options={options}
                    {...opts}
                >
                </Select>
            </Form.Item>

            <Form.Item>
                <Button onClick={() => openEditor('add', undefined)} type='primary' style={{ width: 150 }}>
                    创建Issue
                </Button>
            </Form.Item>
        </Form >
    );
};

