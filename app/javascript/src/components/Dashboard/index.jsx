import Logger from "js-logger";
import * as R from "ramda";
import React, { useEffect, useState } from "react";

import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";
import Container from "components/Container";
import ListPolls from "components/Polls/ListPolls";

const DashBoard = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (err) {
      Logger.error(err);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!R.either(R.isNil, R.isEmpty)(polls)) {
    return (
      <Container>
        <ListPolls polls={polls} />
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-sl leading-5 text-center">
        There are no polls currently! 🗳
      </h1>
    </Container>
  );
};

export default DashBoard;
