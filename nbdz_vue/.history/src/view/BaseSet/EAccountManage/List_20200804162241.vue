/* 2020 / 08 / 04
weihuiying
E贸易账号管理  */
<template>
  <div></div>
</template>

<script>
import { getEAccount } from "@/api/ResManage";
export default {
  data() {
    return {};
  },
  methods: {
    loadData() {
      const _this = this;
      let data = {};
      getEAccount(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>