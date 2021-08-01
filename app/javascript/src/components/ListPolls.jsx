import Logger from "js-logger";
import * as R from "ramda";
import React, { useEffect, useState } from "react";

import pollsApi from "../apis/polls";
import PageLoader from "./PageLoader";

const ListPolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (err) {
      Logger.error(err);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!R.either(R.isNil, R.isEmpty)(polls)) {
    return (
      <div className="flex-column items-center justify-center w-screen h-screen pt-5">
        {polls.map((poll, id) => (
          <div key={id} className="text-lg leading-5 text-center">
            <h3>{poll.title}</h3>
          </div>
        ))}
      </div>
    );
  }

  return (
    <h1 className="text-sl leading-5 text-center">
      There are no polls currently! 🗳
    </h1>
  );
};

export default ListPolls;
