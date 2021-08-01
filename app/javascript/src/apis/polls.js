import axios from "axios";

const list = () => axios.get("/polls");

const pollsApi = {
  list
};

export default pollsApi;
