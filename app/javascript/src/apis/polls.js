import axios from "axios";

const list = () => axios.get("/polls");

const create = payload => {
  logger.info("payload: ", payload);
  axios.post("/polls/", payload);
};

const pollsApi = {
  list,
  create
};

export default pollsApi;
