import request from '@/utils/request';
// 用户管理
export async function GetUserPermissions(params) {
  return request('/api/User/GetUserPermissions', {
    method: 'POST',
    data: params,
  });
}

export async function UserAdd(params) {
  return request('/api/User/Add', {
    method: 'POST',
    data: params,
  });
}

export async function UserGetPage(params) {
  return request('/api/User/GetPage', {
    method: 'POST',
    data: params,
  });
}

export async function UserDelete(id) {
  return request('/api/User/Delete/' + id, {
    method: 'POST'
  });
}

export async function UserGetList(params) {
  return request('/api/User/GetList', {
    method: 'POST',
    data: params,
  });
}
export async function UserGet(params) {
  return request('/api/User/Get', {
    method: 'POST',
    data: params,
  });
}
export async function UserEdit(params) {
  return request('/api/User/Edit', {
    method: 'POST',
    data: params,
  });
}
// 角色管理
export async function RoleGetPermissions(id) {
  return request('/api/ResRole/GetPermissions/' + id, {
    method: 'POST',
  });
}
export async function RoleSaveFunctions(id) {
  return request('/api/ResRole/SaveFunctions/' + id, {
    method: 'POST',
  });
}

export async function RoleGetPage(params) {
  return request('/api/ResRole/GetPage', {
    method: 'POST',
    data: params,
  });
}

export async function RoleDelete(id) {
  return request('/api/ResRole/Delete/' + id, {
    method: 'POST',
  });
}

export async function RoleGet(params) {
  return request('/api/ResRole/Get', {
    method: 'POST',
    data: params,
  });
}

export async function RoleEdit(params) {
  return request('/api/ResRole/Edit', {
    method: 'POST',
    data: params,
  });
}

export async function RoleAdd(params) {
  return request('/api/ResRole/Add', {
    method: 'POST',
    data: params,
  });
}

// 资源管理
export async function ResourceGetPage(params) {
  return request('/api/ResResource/GetPage', {
    method: 'POST',
    data: params,
  });
}

export async function ResourceDelete(id) {
  return request('/api/ResResource/Delete/' + id, {
    method: 'POST',
  });
}

export async function ResResourceGet(params) {
  return request('/api/ResResource/Get', {
    method: 'POST',
    data: params,
  });
}

export async function ResResourceEdit(params) {
  return request('/api/ResResource/Edit', {
    method: 'POST',
    data: params,
  });
}

export async function ResResourceAdd(params) {
  return request('/api/ResResource/Add', {
    method: 'POST',
    data: params,
  });
}

// 组织管理
export async function DeptGetChildList(id) {
  return request('/api/ResDept/GetChildList/' + id, {
    method: 'POST',
  });
}

export async function DeptGetList(params) {
  return request('/api/ResDept/GetList', {
    method: 'POST',
    data: params,
  });
}

export async function DeptDelete(id) {
  return request('/api/ResDept/Delete/' + id, {
    method: 'POST',
  });
}

export async function DeptGet(params) {
  return request('/api/ResDept/Get', {
    method: 'POST',
    data: params,
  });
}

export async function DeptEdit(params) {
  return request('/api/ResDept/Edit', {
    method: 'POST',
    data: params,
  });
}

export async function DeptAdd(params) {
  return request('/api/ResDept/Add', {
    method: 'POST',
    data: params,
  });
}

// 任务管理
export async function ScheduleGetPage(params) {
  return request('/api/Schedule/GetPage', {
    method: 'POST',
    data: params,
  });
}
// 执行任务
export async function ScheduleExcute(id) {
  return request('/api/Schedule/Excute/' + id, {
    method: 'POST',
  });
}
// 停止任务
export async function ScheduleStop(id) {
  return request('/api/Schedule/Stop/' + id, {
    method: 'POST',
  });
}
// 恢复暂停任务
export async function ScheduleResume(id) {
  return request('/api/Schedule/Resume/' + id, {
    method: 'POST',
  });
}
export async function ScheduleDelete(id) {
  return request('/api/Schedule/Delete/' + id, {
    method: 'POST',
  });
}

export async function ScheduleEdit(params) {
  return request('/api/Schedule/Edit', {
    method: 'POST',
    data: params,
  });
}

export async function ScheduleAdd(params) {
  return request('/api/Schedule/Add', {
    method: 'POST',
    data: params,
  });
}
