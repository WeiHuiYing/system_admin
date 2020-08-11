import axios from "@/libs/api.request";

export const getSales = data => {
  return axios.request({
    url: "api/SingleSalesAnalysis/GetPage/",
    method: "POST",
    data
  });
};
