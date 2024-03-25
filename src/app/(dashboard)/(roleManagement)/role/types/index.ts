export type searchRoleType = {
  name: string;
};

// zustand store & action types
export type Store = {
  roleId: string;
  editRoleId: string;
  roleAccessData: {
    id: number | undefined;
    fullName: string;
  }[];
};

export type Actions = {
  setRoleId: (value: string) => void;
  setEditRoleId: (value: string) => void;
  setRoleAccessData: (value: { id: number; fullName: string }[]) => void;
};
