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
