<template>
    <div class="flip-card" @click="isFlipped = !isFlipped">
        <div class="flip-card-inner" :class="{ flipped: isFlipped }">
            <div class="flip-card-front">
                <div class="content">
                    <h3 class="question">{{ card.q }}</h3>
                    <p v-if="hint" class="hint">{{ hint }}</p>
                    <div class="tip">点击卡片查看答案</div>
                </div>
            </div>
            <div class="flip-card-back">
                <div class="content">
                    <p class="answer">{{ card.a }}</p>
                    <n-button type="primary" @click.stop="handleKnow" class="know-btn">
                        我记住了
                    </n-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui';

const props = defineProps(['card', 'hint']);
const emit = defineEmits(['know']);

const isFlipped = ref(false);

const handleKnow = () => {
    emit('know');
};
</script>

<style scoped>
.flip-card {
    background-color: transparent;
    perspective: 1000px;
    width: 300px;
    height: 200px;
    cursor: pointer;
    margin: 20px;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
}

.flip-card-inner.flipped {
    transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flip-card-front {
    background: linear-gradient(145deg, #ffffff, #f5f5f5);
    color: #333;
}

.flip-card-back {
    background: linear-gradient(145deg, #4a90e2, #357abd);
    color: white;
    transform: rotateY(180deg);
}

.content {
    padding: 20px;
    width: 100%;
}

.question {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #2c3e50;
    font-weight: 600;
}

.answer {
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.4;
}

.hint {
    font-size: 0.9rem;
    color: #666;
    margin-top: 10px;
    font-style: italic;
}

.tip {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    font-size: 0.8rem;
    color: #999;
    opacity: 0.8;
}

.know-btn {
    margin-top: 15px;
    padding: 8px 20px;
    border-radius: 20px;
    transition: all 0.3s ease;
}

.know-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 添加悬停效果 */
.flip-card:hover .flip-card-inner {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* 添加响应式设计 */
@media (max-width: 480px) {
    .flip-card {
        width: 260px;
        height: 180px;
    }

    .question {
        font-size: 1rem;
    }

    .answer {
        font-size: 0.9rem;
    }
}
</style>