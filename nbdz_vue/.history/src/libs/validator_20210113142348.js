import dayjs from "dayjs";
import { Message } from "view-design";
/* 用户密码判断*/
export function checkPwd(rule, value, callback) {
  if (value && value != "") {
    const pwdregex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{6,}/;
    if (pwdregex.test(value)) {
      callback();
    } else {
      callback(new Error("请输入包含大小写字母特殊符号与数字的不小于6位密码"));
    }
  } else {
    callback();
  }
}

// 判断时间并返回  结束为选中时间当天
// 传入一个字符串变量
export function filtersDate(keyString, startTime, endTime, keyStringEnd) {
  let filterQuery = [];
  if (startTime != "" && endTime != "") {
    if (
      !dayjs(endTime).isAfter(dayjs(startTime)) &&
      dayjs(endTime).diff(dayjs(startTime), "day") != "0"
    ) {
      Message.error({
        content: keyString + "结束时间在开始时间之后",
        duration: 10,
        closable: true
      });
      return false;
    } else {
      if (keyStringEnd) {
        let Start = {
          key: keyString,
          binaryop: "gte",
          value: dayjs(startTime).format("YYYY-MM-DD"),
          andorop: "and"
        };
        let End = {
          key: keyStringEnd,
          binaryop: "lte",
          value: dayjs(endTime).format("YYYY-MM-DD"),
          andorop: "and"
        };
        filterQuery.push(Start);
        filterQuery.push(End);
      } else {
        let Start = {
          key: keyString,
          binaryop: "gte",
          value: dayjs(startTime).format("YYYY-MM-DD"),
          andorop: "and"
        };
        let End = {
          key: keyString,
          binaryop: "lte",
          value: dayjs(endTime).format("YYYY-MM-DD"),
          andorop: "and"
        };
        filterQuery.push(Start);
        filterQuery.push(End);
      }
    }
  } else if (startTime != "" || endTime != "") {
    Message.error({
      content: "请检查开始时间与结束时间",
      duration: 10,
      closable: true
    });
    return false;
  }
  return filterQuery;
}

// 新接口写法  一个变量
export function filtersNewDate(keyString, startTime, endTime, keyStringEnd) {
  let filterQuery = [];
  if (startTime != "" && endTime != "") {
    if (
      !dayjs(endTime).isAfter(dayjs(startTime)) &&
      dayjs(endTime).diff(dayjs(startTime), "day") != "0"
    ) {
      Message.error({
        content: keyString + "结束时间在开始时间之后",
        duration: 10,
        closable: true
      });
      return false;
    } else {
      if (keyStringEnd) {
        let Start = {
          key: keyString,
          option: "gte",
          value: dayjs(startTime).format("YYYY-MM-DD"),
          isAnd: "true"
        };
        let End = {
          key: keyStringEnd,
          option: "lte",
          value: dayjs(endTime).format("YYYY-MM-DD"),
          isAnd: "true"
        };
        filterQuery.push(Start);
        filterQuery.push(End);
      } else {
        let Start = {
          key: keyString,
          option: "gte",
          value: dayjs(startTime).format("YYYY-MM-DD"),
          isAnd: "true"
        };
        let End = {
          key: keyString,
          option: "lte",
          value: dayjs(endTime).format("YYYY-MM-DD"),
          isAnd: "true"
        };
        filterQuery.push(Start);
        filterQuery.push(End);
      }
    }
  } else if (startTime != "" || endTime != "") {
    Message.error({
      content: "请检查开始时间与结束时间",
      duration: 10,
      closable: true
    });
    return false;
  }
  return filterQuery;
}
// 新接口写法   精确到时分秒
export function filtersNewDateTime(
  keyString,
  startTime,
  endTime,
  keyStringEnd
) {
  let filterQuery = [];
  if (startTime != "" && endTime != "") {
    if (
      !dayjs(endTime).isAfter(dayjs(startTime)) &&
      dayjs(endTime).diff(dayjs(startTime), "day") != "0"
    ) {
      Message.error({
        content: keyString + "结束时间在开始时间之后",
        duration: 10,
        closable: true
      });
      return false;
    } else {
      if (keyStringEnd) {
        let Start = {
          key: keyString,
          option: "gte",
          value: dayjs(startTime).format("YYYY-MM-DD HH:mm:ss"),
          isAnd: "true"
        };
        let End = {
          key: keyStringEnd,
          option: "lte",
          value: dayjs(endTime).format("YYYY-MM-DD HH:mm:ss"),
          isAnd: "true"
        };
        filterQuery.push(Start);
        filterQuery.push(End);
      } else {
        let Start = {
          key: keyString,
          option: "gte",
          value: dayjs(startTime).format("YYYY-MM-DD hh:mm:sss"),
          isAnd: "true"
        };
        let End = {
          key: keyString,
          option: "lte",
          value: dayjs(endTime).format("YYYY-MM-DD hh:mm:sss"),
          isAnd: "true"
        };
        filterQuery.push(Start);
        filterQuery.push(End);
      }
    }
  } else if (startTime != "" || endTime != "") {
    Message.error({
      content: "请检查开始时间与结束时间",
      duration: 10,
      closable: true
    });
    return false;
  }
  return filterQuery;
}

// 判断时间并返回  结束为选中时间第二天  /log/开头的api
export function filtersAfterDate(stringStart, stringEnd, startTime, endTime) {
  if (startTime != "" && endTime != "") {
    endTime = dayjs(endTime).add(1, "day");
    if (!dayjs(endTime).isAfter(dayjs(startTime))) {
      Message.error({
        content: "结束时间在开始时间之后",
        duration: 10,
        closable: true
      });
      return false;
    } else {
      let data = {};
      data[stringStart] = dayjs(startTime).format("YYYY-MM-DD");
      data[stringEnd] = dayjs(endTime).format("YYYY-MM-DD");
      return data;
    }
  } else if (startTime != "" || endTime != "") {
    Message.error({
      content: "请检查开始时间与结束时间",
      duration: 10,
      closable: true
    });
    return false;
  }
}
// 判断时间并返回  当天 /log/开头的api
export function filtersLogDate(stringStart, stringEnd, startTime, endTime) {
  if (startTime != "" && endTime != "") {
    if (
      !dayjs(endTime).isAfter(dayjs(startTime)) &&
      dayjs(endTime).diff(dayjs(startTime), "day") != "0"
    ) {
      Message.error({
        content: "结束时间在开始时间之后",
        duration: 10,
        closable: true
      });
      return false;
    } else {
      let data = {};
      data[stringStart] = dayjs(startTime).format("YYYY-MM-DD");
      data[stringEnd] = dayjs(endTime).format("YYYY-MM-DD");
      return data;
    }
  } else if (startTime != "" || endTime != "") {
    Message.error({
      content: "请检查开始时间与结束时间",
      duration: 10,
      closable: true
    });
    return false;
  }
}


// bolb格式转为json
export function fileToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (res) => {
      const { result } = res.target; // 得到字符串
      const data = JSON.parse(result); // 解析成json对象
      resolve(data);
    }; // 成功回调
    reader.onerror = (err) => {
      reject(err);
    }; // 失败回调
    reader.readAsText(new Blob([file]), "utf-8"); // 按照utf-8编码解析
  });
},