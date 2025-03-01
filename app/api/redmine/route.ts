import { NextRequest, NextResponse } from 'next/server';
import { getIssues } from '@/service/redmineClient'; // 假设这是获取 Redmine issue 的服务函数

// 新增的 POST 方法
export async function POST(request: NextRequest) {
    try {
        // 从请求体中获取参数，这里假设请求体是一个 string[] 类型的 issue ID 数组
        const issueIds: string[] = await request.json();

        // 检查参数是否为数组
        if (!Array.isArray(issueIds)) {
            return NextResponse.json({ error: '参数必须是一个字符串数组' }, { status: 400 });
        }

        // 调用服务函数获取 Redmine issue
        const issues = await getIssues(issueIds);

        // 返回成功响应，包含获取到的 issue 数据
        return NextResponse.json(issues, { status: 200 });
    } catch (error) {
        console.error('获取 Redmine issue 时出错:', error);
        // 返回错误响应
        return NextResponse.json({ error: '获取 Redmine issue 时出错' }, { status: 500 });
    }
}
