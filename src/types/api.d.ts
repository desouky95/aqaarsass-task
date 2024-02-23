// type APIResponse<T = any, Name extends string = "data"> = {
type APIResponse = {
  Error_code: number;
  Error_msg: string;
};
// & {
//   [P in Name]: T;
// };

type Stat = {
  Category: string;
  Dtype: string;
  Stat: number;
};

type StatsResponse = APIResponse & {
  Stats_list: Array<Stat>;
};
