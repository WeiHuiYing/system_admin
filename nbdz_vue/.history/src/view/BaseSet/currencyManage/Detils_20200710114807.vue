<template>
  <div>
    <Form ref="formCurrency" label-position="right" :model="Row" :rules="rule" :label-width="200">
      <Row>
        <Col span="12">
          <FormItem label="货币代码" prop="currencyCode">
            <Input v-model="Row.currencyCode" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="货币名称" prop="currencyName">
            <Input v-model="Row.currencyName" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="对RMB汇率" prop="currencyRate2RMB">
            <Input v-model="Row.currencyRate2RMB" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="对USD汇率" prop="currencyRate2USD">
            <Input v-model="Row.currencyRate2USD" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="开始时间" prop="startTime">
            <DatePicker
              type="datetime"
              v-model="Row.startTime"
              format="YYYY-MM-DD"
              placeholder="请选择开始时间"
              style="width: 300px"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="结束时间" prop="endTime">
            <DatePicker
              type="datetime"
              v-model="Row.endTime"
              format="YYYY-MM-DD"
              placeholder="请选择运行时间"
              style="width: 300px"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="24">
          <div style="text-align:center;">
            <Button @click="parent.modelEdit = false">取消</Button>
            <Button style="margin-left:20px;" type="primary" @click="save('formCurrency')">保存</Button>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Row: {}
    };
  },
  watch: {
    editRow(newVal, oldVal) {
      this.Row = Object.assign({}, newVal);
    },
    save() {}
  }
};
</script>