import React, { useEffect, useState } from "react";
import * as R from "ramda";
import { useHistory } from "react-router";

import pollsApi from "apis/pollsApi";

const ListPolls = () => {
  const [polls, setPolls] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchPolls();
  }, []);

  useEffect(() => {
    logger.info(polls);
  }, [polls]);

  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
    } catch (err) {
      logger.error(err);
    }
  };

  const handleShowPoll = async id => {
    history.push(`/polls/${id}`);
  };

  if (R.either(R.isNil, R.isEmpty)(polls)) {
    return (
      <h1 className="text-sl leading-5 text-center">
        There are no polls currently! 🗳
      </h1>
    );
  }

  return (
    <div className="flex-column items-center justify-center border shadow-md mx-auto mt-12 md-8 px-2 py-4">
      <h3 className="text-3xl text-indigo-500 font-extrabold px-6">Polls</h3>
      {polls.map((poll, index) => (
        <div
          key={index}
          className="text-lg leading-5 text-center cursor-pointer"
          onClick={() => handleShowPoll(poll.id)}
        >
          <h3>{poll.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ListPolls;
