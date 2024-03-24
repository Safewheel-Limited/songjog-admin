export type searchPermisionType = {
  name: string;
};

// zustand store & action types
export type Store = {
  roleId: string;
  editRoleId: string;
  roleAccessData: {
    id: number | undefined;
    name: string;
  }[];
  permissionAccessData: {
    id: number | undefined;
    name: string;
  }[];
};

export type Actions = {
  setRoleId: (value: string) => void;
  setEditRoleId: (value: string) => void;
  setRoleAccessData: (value: { id: number; name: string }[]) => void;
  setPermissionAccessData: (value: { id: number; name: string }[]) => void;
};
