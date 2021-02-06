import axios from "@/libs/api.request";
import config from "@/config";

// 人事部相关

// 薪酬查询
export const getSalary = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/report/HR_salary/" + urlData,
    method: "GET"
  });
};

// 导出薪酬查询
export const exportSalary = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  let url =
    process.env.NODE_ENV === "development"
      ? config.baseLog.dev
      : config.baseLog.pro + "/log/report/HR_salary/export_excel/" + urlData;
  window.open(url);
};
// 导入薪酬查询
export const importSalary = data => {
  return axios.request({
    url: "/log/report/HR_salary/upload_excel/" + urlData,
    method: "POST",
    responseType: "blob",
    data
  });
};
