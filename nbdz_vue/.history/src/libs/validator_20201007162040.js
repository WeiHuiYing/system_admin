import dayjs from "dayjs";
/* 用户密码判断*/
export function checkPwd(rule, value, callback) {

  if (value && value != "") {
    const pwdregex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{6,}/;
    if (pwdregex.test(value)) {
      callback();
    } else {
      callback(new Error('请输入包含大小写字母特殊符号与数字的不小于6位密码'));
    }
  } else {

    callback();
  }
}

// 判断时间并返回  结束为选中时间当天
export function filtersDate(startString, endString, startTime, endTime) {
  let filterQuery = [];
  if (startTime != "" && endTime != "") {
    if (!dayjs(endTime).isAfter(dayjs(startTime)) &&
      dayjs(endTime).diff(dayjs(startTime), "day") != "0") {
      this.$Message.error({
        content: "结束时间在开始时间之后",
        duration: 10,
        closable: true,
      });
      return false;
    } else {
      let Start = {
        key: startString,
        binaryop: "gte",
        value: dayjs(startTime).format("YYYY-MM-DD"),
        andorop: "and",
      };
      let End = {
        key: endString,
        binaryop: "lte",
        value: dayjs(endTime).format("YYYY-MM-DD"),
        andorop: "and",
      };
      filterQuery.push(Start);
      filterQuery.push(End);
    }
  }
  return filterQuery;
}



// 判断时间并返回  结束为选中时间第二天
export function filtersAfterDate(stringStart, stringEnd, startTime, endTime) {
  const _this = this;
  if (startTime != "" && endTime != "") {
    endTime = dayjs(endTime).add(1, "day");
    if (!dayjs(endTime).isAfter(dayjs(startTime))) {
      this.$Message.error({
        content: "结束时间在开始时间之后",
        duration: 10,
        closable: true,
      });
      return false;
    } else {
      let data = {};
      data[stringStart] = dayjs(startTime).format("YYYY-MM-DD");
      data[stringEnd] = dayjs(endTime).format("YYYY-MM-DD");
      return data;
    }
  }
}
