import { AdminRoleEnum } from '../models/enums/user-role.enum';

export const rolePick = {
  [AdminRoleEnum.ADMIN]: [AdminRoleEnum.ADMIN, AdminRoleEnum.USER],
};
