import EmailTemplate from '@/components/EmailTempate'
import { ReactElement } from 'react'
import { Resend } from 'resend'

// 初始化 Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // 从请求体中解析 JSON 数据
    const { to } = await request.json()

    // 发送邮件
    const { data, error } = await resend.emails.send({
      from: 'HandDrawnAI <no-reply@handdrawn.ai>',
      to: [to],
      subject: 'Welcome to Hand Drawn AI',
      react: EmailTemplate() as ReactElement,
    })

    // 错误处理
    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 })
    }

    // 返回成功响应
    return new Response(JSON.stringify({ data }), { status: 200 })
  } catch (error) {
    // 异常处理
    // @ts-ignore
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
