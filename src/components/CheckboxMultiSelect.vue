<script setup>
import { defineProps, defineEmits } from "vue";

// 接收 `items` 陣列（包含 module_id 和 name）及 `modelValue`（已選擇的項目）
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => []
  }
});

// 事件發送
const emit = defineEmits(["update:modelValue", "change"]);

// 處理選擇變更
const toggleSelection = (item) => {
  const selected = props.modelValue.map((selectedItem) => ({ ...selectedItem })); // 確保不變異原始陣列

  // 透過 module_id 找索引
  const index = selected.findIndex(selectedItem => selectedItem.module_id === item.module_id);

  if (index !== -1) {
    // 如果已選擇，則移除該項目
    selected.splice(index, 1);
  } else {
    // 否則加入選擇陣列
    selected.push({ ...item }); // 確保新增的是新的物件
  }

  // 更新 v-model 綁定值
  emit("update:modelValue", selected);
  emit("change", selected);
};
</script>

<template>
  <div>
    <label>選擇多個項目：</label>
    <div v-for="item in items" :key="item.module_id" class="check_list">
      <input
        type="checkbox"
        :id="'checkbox-' + item.module_id"
        :checked="modelValue.some(selectedItem => selectedItem.module_id === item.module_id)"
        @change="toggleSelection(item)"
      />
      <label :for="'checkbox-' + item.module_id">{{ item.name }}</label>
    </div>
  </div>
</template>

<style scoped>
.check_list {
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  padding-left: 30%;
}
</style>
