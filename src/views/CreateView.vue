<template>
    <div>
        <n-input class="input" type="password" v-model:value="apiKey" placeholder="输入DeepSeek API Key" />
        <n-input class="input" v-model:value="topic" placeholder="输入学习主题（如：勾股定理）" />
        <n-button class="button" @click="generateCards" :loading="loading">
            生成学习卡片
        </n-button>

        <div v-if="cards.length" class="card-grid">
            <FlashCard v-for="(card, index) in cards" :key="index" :card="card" @know="removeCard(index)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { generateFlashcard } from '@/utils/deepseek';
import { NInput, NButton } from 'naive-ui';
import FlashCard from '@/components/FlashCard.vue';
import type { QAPair } from '@/utils/deepseek';
const apiKey = ref('');
const topic = ref('');
const cards = ref<QAPair[]>([]);
const loading = ref(false);

const generateCards = async () => {
    loading.value = true;
    try {
        const newCards = await generateFlashcard(topic.value, apiKey.value);
        cards.value = [...cards.value, ...newCards];
    } finally {
        loading.value = false;
    }
};

const removeCard = (index: number) => {
    cards.value = cards.value.filter((card, i) => i !== index);
};
</script>
<style scoped>
.input {
    width: 100%;
    margin-bottom: 1rem;
}

.button {
    margin-bottom: 1rem;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
}
</style>