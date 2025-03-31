import { defineStore } from 'pinia'
import { generateFlashcard } from '@/utils/deepseek'

export const useDeepSeekStore = defineStore('deepseek', {
  actions: {
    async generateWithCache(topic: string) {
      const cacheKey = `card-${topic}`
      const cached = localStorage.getItem(cacheKey)
      if (cached) return JSON.parse(cached)

      const data = await generateFlashcard(topic)
      localStorage.setItem(cacheKey, JSON.stringify(data))
      return data
    },
  },
})
