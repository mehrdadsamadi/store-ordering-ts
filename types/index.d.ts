declare type SearchParamProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare interface IUserCookie {
  avatar: string;
  phone: string;
  role: string;
  _id: string;
}

declare interface IActionsResponse {
  message?: string;
  error?: string;
}

interface IProvinceAndCities {
  id: number;
  name: string;
  slug: string;
}

declare interface IProvince extends IProvinceAndCities {
  tel_prefix: string;
}

declare interface ICities extends IProvinceAndCities{
  province_id: number;
}