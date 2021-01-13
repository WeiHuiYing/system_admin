// 亚马逊相关
import axios from "@/libs/api.request";

// 获取已导入列表
export const asinList = data => {
  return axios.request({
    url: "/newApi/amazonAsin/getList",
    method: "POST",
    data
  });
};

// 上传对应关系
export const uploadAsin = data => {
  return axios.request({
    url: "/newApi/amazonAsin/upload",
    method: "POST",
    responseType: "blob",
    data
  });
};

// 批量更新销售人员
export const batchUpdateAsin = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/newApi/amazonAsin/batchUpdate/" + urlData,
    method: "GET"
  });
};
