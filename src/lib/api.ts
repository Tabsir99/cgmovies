import axios from "axios";

export const api = axios.create({
  family: 4,
  proxy: false,
});
