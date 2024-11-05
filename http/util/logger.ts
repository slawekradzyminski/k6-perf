import http from "k6/http";

export const checkResult = (
  res: http.RefinedResponse<http.ResponseType | undefined>,
  status: boolean
) => {
  if (!status) {
    console.error(res);
  }
};
