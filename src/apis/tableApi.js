import { DOMAIN } from "../utils/const";
import { http } from "../utils/http";

const URL = `${DOMAIN}positions/`;
export const getTable = (tableId) => http.get(`${URL}${tableId}`);
