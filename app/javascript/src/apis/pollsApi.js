import axios from "axios";

const list = () => axios.get("/polls");

const create = payload => {
  logger.info("payload: ", payload);
  axios.post("/polls/", payload);
};

const show = id => axios.get(`/polls/${id}`);

const vote = (id, payload) => axios.put(`/polls/${id}`, payload);

const pollsApi = {
  list,
  show,
  create,
  vote
};

export default pollsApi;
