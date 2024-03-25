import { create } from "zustand";
import { Actions, Store } from "../permission/types";

export const useRoleAndPermissionState = create<Store & Actions>(
  (set): Store & Actions => ({
    roleId: "",
    editRoleId: "",
    roleAccessData: [],
    permissionAccessData: [],
    setRoleId: (value) => set({ roleId: value }),
    setEditRoleId: (value) => set({ editRoleId: value }),
    setRoleAccessData: (data) => set({ roleAccessData: data }),
    setPermissionAccessData: (data) => set({ permissionAccessData: data }),
  })
);
