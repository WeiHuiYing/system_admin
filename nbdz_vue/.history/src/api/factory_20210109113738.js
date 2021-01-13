import axios from "@/libs/api.request";

// 工厂相关
// 修改已上传数据

export const EditBaseDate = data => {
  return axios.request({
    url: "/newApi/sku/editBaseDate/",
    method: "PUT",
    data
  });
};

// 获取已维护数据列表
export const GetBaseList = data => {
  return axios.request({
    url: "/newApi/sku/getBaseList/",
    method: "POST",
    data
  });
};

//  导入工厂原料成本基础数据
export const UploadBaseMaterial = data => {
  return axios.request({
    url: "/newApi/sku/uploadBaseSkuMaterial/",
    method: "POST",
    data,
    responseType: "blob"
  });
};

// 上传需要计算的SKU
export const UploadCalculateSku = data => {
  return axios.request({
    url: "/newApi/sku/uploadNeedCalculateSku/",
    method: "POST",
    data
  });
};
