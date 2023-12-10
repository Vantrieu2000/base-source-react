import { BulletinArea, BulletinStatus, CategoryType } from '../enum/bulletin';
import { UserDto } from './users.dto';

export interface BulletinCategoryDto {
  id: string;
  name: string;
  type: CategoryType;
}
export interface BulletinDto {
  id: string;
  createdOnDate: Date;
  title: string;
  banner: string;
  description: string;
  area: BulletinArea;
  status: BulletinStatus;
  category: BulletinCategoryDto;
  user: UserDto;
}

export interface ResFetchBulletin {
  data: BulletinDto[];
  length: number;
}
