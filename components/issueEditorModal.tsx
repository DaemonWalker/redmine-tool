'use client'

import { Issue } from "@/model/save"
import useEditorStore from "@/store/editorStore"
import useFilterStore from "@/store/filterStore"
import useIssueStore from "@/store/issueStore"
import { App, Form, Input, Modal, Select } from "antd"
import { FC, useMemo, useState } from "react"

export const IssueEditorModal: FC = () => {
    const { open, data, type, closeEditor } = useEditorStore();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { notification } = App.useApp();
    const { createIssue, updateIssue, data: saveData, assigneeOptions } = useIssueStore();
    const opText = useMemo(() => type === 'add' ? '创建' : '更新', [type])
    const options = useMemo(() => assigneeOptions(saveData), [saveData]);
    const onSubmit = async (values: Issue) => {
        if (values) {
            values.assignee = values.assignee;
            setConfirmLoading(true);
            try {
                const op = type === 'add' ? createIssue : updateIssue;
                const result = await op(values)
                if (result.ok) {
                    notification.success({ message: result.message });
                    closeEditor();
                } else {
                    notification.error({ message: result.message });
                }
            } finally {
                setConfirmLoading(false);
            }
        }
    }
    return (
        <Modal
            open={open}
            title={`${opText} Issue`}
            okText={opText}
            cancelText="取消"
            okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
            onCancel={() => closeEditor()}
            destroyOnClose
            confirmLoading={confirmLoading}
            modalRender={(dom) => (
                <Form name="vertical"
                    layout="vertical"
                    clearOnDestroy onFinish={(values) => onSubmit(values)}>
                    {dom}
                </Form>
            )}>
            <Form.Item<Issue> label="Redmine票号" name="id"
                rules={[{ required: true }]} style={{ paddingTop: 12 }} initialValue={data?.id}>
                <Input disabled={type === "edit"} />
            </Form.Item>

            <Form.Item<Issue> label="Backlog票号" name="backlog" rules={[{ required: true }]} initialValue={data?.backlog}>
                <Input />
            </Form.Item>

            <Form.Item<Issue> label="负责人" name="assignee" rules={[{ required: true }]} initialValue={data?.assignee ? [data?.assignee] : []}>
                <Select
                    key="assignee"
                    mode="tags"
                    placeholder="请选择 Assignee"
                    options={options}
                />
            </Form.Item>
        </Modal >
    )
}