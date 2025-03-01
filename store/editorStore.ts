import { create } from 'zustand';

// 定义 Issue 类型
import { Issue } from '@/model/save';

// 定义状态接口
interface EditorState {
    open: boolean
    data?: Issue,
    type: 'add' | 'edit',
    openEditor: (type: 'add' | 'edit', data?: Issue) => void,
    closeEditor: () => void,
}

// 创建 zustand store
const useEditorStore = create<EditorState>((set) => ({
    open: false,
    data: undefined,
    type: 'add',
    openEditor: (type, data: Issue | undefined = undefined) => set({ type, open: true, data }),
    closeEditor: () => set({ open: false, data: undefined }),
}));

export default useEditorStore;
