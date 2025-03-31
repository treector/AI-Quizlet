import axios from 'axios'

// 移除环境变量引用
// const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_KEY

interface QAPair {
  q: string
  a: string
}

export const generateFlashcard = async (topic: string, apiKey: string) => {
  const response = await axios.post(
    'https://api.deepseek.com/v1/chat/completions',
    {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content:
            '你是一个学习助手，请根据用户输入生成问答对。返回格式必须是markdown代码块中的JSON数组，例如：```json\n[{"q": "问题", "a": "答案"}]\n```',
        },
        {
          role: 'user',
          content: `请生成关于【${topic}】的3个学习问答对，答案简洁易懂，适合中学生`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  )

  // 获取AI返回的内容并解析
  const aiResponse = response.data.choices[0].message.content
  return parseAIResponse(aiResponse)
}

function parseAIResponse(text: string): QAPair[] {
  try {
    // 首先清理markdown代码块标记
    const cleanText = text
      .replace(/^```json\n/, '') // 移除开头的 ```json
      .replace(/\n```$/, '') // 移除结尾的 ```
      .trim()

    // 解析JSON
    const parsedData = JSON.parse(cleanText)
    return parsedData
  } catch (error) {
    console.error('解析AI响应失败，原始文本:', text)
    return [] // 解析失败时返回空数组
  }
}
