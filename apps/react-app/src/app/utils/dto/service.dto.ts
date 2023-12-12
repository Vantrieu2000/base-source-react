export interface CreateServiceDto {
  name: string;
  // storeId : string;
  courses : []
}
export interface EditServiceDto {
  id : string;
  name: string;
}

export interface CreateCourseDto {
  name: string;
  serviceId : string;
  price : number;
  description : string;
  time : number;
  execTime: 0,
  storeId: string
}
export interface EditCourseDto {
  id : string;
  name: string;
  serviceId : string;
  price : number;
  description : string;
  time : number
}

export interface ServiceDto {
  id: string;
  name: string;
  isCoupon: boolean;
  courses: CourseDto[];
  courseSelect?: CourseDto;
}

export interface CourseDto {
  id: string;
  name: string;
  price: string | number;
  serviceId: string;
  time: number;
  execTime: number;
  storeId?: string;
  description?: string;
}