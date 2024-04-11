import axios from "axios";

const BASE_URL = "http://localhost:1328/eazybuy/v1";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTJiMTE5NDAxZTA4ZmYwNWUzNmJjMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMjc0NzI1NSwiZXhwIjoxNzEzMDA2NDU1fQ.g6cMO4xIF58NFTzjFNkCzYIZWlfIxvyi8RuAeeFIDrc";

export const publicRequest = axios.create({ baseURL: BASE_URL });
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
