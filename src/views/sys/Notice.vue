<template>
  <div class="main-body">
    <!-- 工具栏 -->
    <div class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input
            v-model="filters.title"
            :placeholder="t('thead.title')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="doSearch">{{
            t("action.search")
          }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="plus" @click="doAdd">{{
            t("action.add")
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格栏内容 -->
    <cm-table
      ref="tableRef"
      :get-page="listPage"
      :filters="filters"
      :columns="columns"
      :operations="operations"
      @handleEdit="doEdit"
      @handleDelete="handleDelete"
    >
    </cm-table>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="isEdit ? t('action.edit') : t('action.add')"
      v-model="dialogVisible"
      width="40%"
      draggable
      :close-on-click-modal="true"
      @close="doClose"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        label-position="right"
      >
        <el-form-item :label="t('thead.title')" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item :label="t('thead.content')" prop="content">
          <el-input
            type="textarea"
            v-model="form.content"
            :words-limit="300"
          ></el-input>
        </el-form-item>
        <el-form-item :label="t('form.publish')">
          <el-switch v-model="form.isPublish"></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="doClose">{{ t("action.cancel") }}</el-button>
        <el-button
          type="primary"
          :loading="formLoading"
          @click="handleSubmit"
          >{{ t("action.submit") }}</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { listPage, save, update, remove } from "@/api/sys-notice";
import { computed, reactive } from "vue";
import useTableHandlers from "../use-table-handlers";
const filters = reactive({
  title: "",
});
const operations = [
  {
    type: "edit",
    disabled: (row) => !!row.publishTime,
  },
  {
    type: "delete",
  },
];

const form = reactive({
  id: "",
  title: "",
  content: "",
  isPublish: false,
});

const {
  t,
  tableRef,
  dialogVisible,
  isEdit,
  formLoading,
  formRef,
  doSearch,
  doAdd,
  doEdit,
  doClose,
  doSubmit,
  doRemove,
} = useTableHandlers(form);

const columns = computed(() => [
  { type: "selection" },
  { prop: "id", label: t("thead.ID"), minWidth: 50 },
  {
    prop: "title",
    label: t("thead.title"),
    minWidth: 120,
    showOverflowTooltip: true,
  },
  {
    prop: "content",
    label: t("thead.content"),
    minWidth: 120,
    showOverflowTooltip: true,
  },
  { prop: "publishTime", label: t("thead.publishTime"), minWidth: 120 },
  { prop: "createdTime", label: t("thead.createdTime"), minWidth: 120 },
  { prop: "createdBy", label: t("thead.createdBy"), minWidth: 120 },
]);

const rules = computed(() => {
  return {
    title: [
      {
        required: true,
        message: t("form.titleRequired"),
        trigger: ["blur", "change"],
      },
      {
        min: 2,
        max: 60,
        message: t("form.titleError"),
        trigger: ["blur", "change"],
      },
    ],
    content: [
      {
        required: true,
        message: t("form.contentRequired"),
        trigger: ["blur", "change"],
      },
      {
        min: 2,
        max: 300,
        message: t("form.contentError"),
        trigger: ["blur", "change"],
      },
    ],
  };
});
//methods
function handleSubmit() {
  doSubmit({ save, update });
}

function handleDelete(ids, callback) {
  doRemove(remove, ids, callback);
}
</script>
