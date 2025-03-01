'use client'
import { FC, useState } from "react"
import { App, Modal } from "antd"
import useDeleteConfirmModalStore from "@/store/deleteConfirmModalStore"
import useIssueStore from "@/store/issueStore";

export const CloseConfirmModal: FC = () => {
    const { open, id, setOpen } = useDeleteConfirmModalStore();
    const { deleteIssue } = useIssueStore();
    const [loading, setLoading] = useState<boolean>(false);
    const { notification } = App.useApp();
    const onOk = () => {
        setLoading(true);
        deleteIssue(id).then((result) => {
            if (result.ok) {
                notification.success({ message: "删除成功" })
                setOpen(false, id);
            } else {
                notification.error({ message: result.message })
            }
        }).finally(() => setLoading(false))
    }
    return (
        <Modal open={open} title="关闭确认"
            confirmLoading={loading}
            onCancel={() => setOpen(false, id)}
            onOk={() => onOk()}>
            <p>{`真的要删除 Redmine-${id} 吗？`}</p>
        </Modal>
    )

}