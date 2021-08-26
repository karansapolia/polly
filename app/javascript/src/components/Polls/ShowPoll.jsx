import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../Container";
import pollsApi from "../../apis/pollsApi";
import { countTotalVotes } from "../../utils/common";

const ShowPoll = () => {
  const [pollData, setPollData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadPollData();
    logger.info("ShowPoll loaded. id: ", id);
  }, []);

  useEffect(() => {
    logger.info("total votes: ", totalVotes);
  }, [totalVotes]);

  useEffect(() => {
    logger.info("pollData: ", pollData);
    if (pollData && pollData?.results) {
      setTotalVotes(countTotalVotes(pollData.results));
    }
  }, [pollData]);

  const loadPollData = async () => {
    const res = await pollsApi.show(id);
    setPollData(res.data.poll);
    logger.info(res.data.poll);
  };

  // const { title, options, results } = pollData;
  // logger.info({ title }, { options }, { results });

  const handleVote = async (e, option) => {
    e.preventDefault();
    logger.info("selected option: ", option);
    let pollDataCopy = pollData;
    let { options, results } = pollDataCopy;

    if (results) {
      results[options.indexOf(option)] = results[options.indexOf(option)]
        ? ++results[options.indexOf(option)]
        : 1;
    } else {
      results = new Array(4).fill(0);
      results[options.indexOf(option)] = 1;
    }

    pollDataCopy.results = results;
    pollDataCopy = { poll: { ...pollDataCopy } };
    logger.info("Modified poll data: ", pollDataCopy);

    try {
      const res = await pollsApi.vote(id, pollDataCopy);
      logger.info("returned data: ", res);
      setPollData(res.data.poll);
    } catch (err) {
      logger.error(err);
    } finally {
      setSubmitted(true);
    }
  };

  return (
    <Container>
      <div className="flex h-full">
        <div className="bg-white border shadow-md mx-auto w-3/4 md-8 px-2 py-4">
          <div className="flex justify-center w-full">
            <div className="w-3/4 px-4">
              <h2 className="text-2xl font-semibold text-blue-500">
                {pollData?.title}
              </h2>
              {pollData?.options &&
                pollData.options.map((option, index) => (
                  <div
                    className="w-3/4 py-2 hover:bg-gray-300 cursor-pointer flex"
                    key={index}
                    onClick={e => {
                      submitted ? null : handleVote(e, option);
                    }}
                  >
                    <p className="px-2">{option}</p>
                    {submitted ? (
                      <p className="px-5 text-blue-300">{`${(
                        (pollData.results[pollData.options.indexOf(option)] /
                          totalVotes) *
                        100
                      ).toFixed(2)} %`}</p>
                    ) : null}
                  </div>
                ))}
              {submitted ? (
                <h3 className="mt-3 text-xl text-blue-400">
                  Total number of votes: {totalVotes}
                </h3>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShowPoll;
