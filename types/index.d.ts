// declare enum FormFieldType {
//     INPUT = 'input',
//     CHECKBOX = "checkbox",
//     TEXTAREA = "textarea",
//     PHONE_INPUT = "phoneInput",
//     DATE_PICKER = "datePicker",
//     SELECT = "select",
//     SKELETON = "skeleton"
// }

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