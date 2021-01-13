// 客户中心
import axios from "@/libs/api.request";
/* 2020 / 09/ 17
weihuiying
客户中心订单情况查询*/

export const CsOrderQuery = data => {
  return axios.request({
    url: "api/OrderReport/CsOrderQuery",
    method: "POST",
    data
  });
};
// 导出
export const CsOrderQueryExport = data => {
  return axios.request({
    url: "api/OrderReport/CsOrderQueryExport",
    method: "POST",
    data,
    responseType: "blob"
  });
};
