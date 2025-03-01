import { create } from 'zustand';

// 定义状态接口
interface CustomState {
    id: string;
    open: boolean;
    setOpen: (newOpen: boolean, id: string) => void;
}

// 创建 zustand store
const useDeleteConfirmModalStore = create<CustomState>((set) => ({
    id: "0",
    open: false,
    setOpen: (newOpen, id) => set(() => ({ open: newOpen, id: id })),
}));

export default useDeleteConfirmModalStore;
