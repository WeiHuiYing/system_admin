<template>
  <Form ref="formInline" :model="editData" label-position="right" :label-width="250">
    <FormItem label="Tracking_more物流对照码" prop="ServerName">
      <Input v-model="editData.ServerName" />
    </FormItem>
    <FormItem label="物流方式" prop="Shiping">
      <Input v-model="editData.Shiping" />
    </FormItem>
    <FormItem label="Carry_code" prop="TrackingMoreCode">
      <Input v-model="editData.TrackingMoreCode" />
    </FormItem>
    <FormItem>
      <Button @click="saveCommit()" type="primary">提交</Button>
    </FormItem>
  </Form>
</template>

<script>
import { trackingCode as editCode } from "@/api/Logistics";
export default {
  props: { editData: Object, parent: Object },
  data() {
    return {};
  },
  methods: {
    saveCommit() {
      const _this = this;
      if (_this.parent.isAdd) {
        editCode(_this.$props.editData, "POST")
          .then(res => {
            if (res.status == 201) {
              this.$Message.info("添加成功");
              this.parent.modelEdit = false;
              this.parent.loadData();
            } else {
              this.$Message.error({
                content: msg,
                duration: 10,
                closable: true
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        editCode(_this.$props.editData, "PUT")
          .then(res => {
            if (res.status == 200) {
              this.$Message.info("修改成功");
              this.parent.modelEdit = false;
              this.parent.loadData();
            } else {
              this.$Message.error({
                content: msg,
                duration: 10,
                closable: true
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

