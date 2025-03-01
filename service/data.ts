import { promises as fs } from "fs";
import path from 'path';
import { Issue } from '@/model/save';

const getIssues = async () => {
    const filePath = path.join(process.cwd(), 'data', 'data.json');

    // 读取文件内容
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data: Issue[] = JSON.parse(fileContents);
    return data
}

const saveData = async (data: Issue[]) => {
    const filePath = path.join(process.cwd(), 'data', 'data.json');

    // 将数据写入文件
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

const deleteIssue = async (id: string) => {
    const data = await getIssues()
    const newData = data.filter(item => item.id !== id)
    await saveData(newData)
}

const updateIssue = async (newData: Issue) => {
    const { id } = newData;
    const data = await getIssues()
    const index = data.findIndex(item => item.id === id)
    if (index !== -1) {
        data[index] = newData
        await saveData(data)
    }
}

const createIssue = async (newData: Issue) => {
    const data = await getIssues()
    data.push(newData)
    await saveData(data)
}

export default { createIssue, deleteIssue, updateIssue, getIssues }