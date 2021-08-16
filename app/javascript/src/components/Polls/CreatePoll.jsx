import React, { useState, useEffect } from "react";

import Container from "components/Container";
import PollForm from "components/Polls/Form/PollForm";
import pollsApi from "apis/pollsApi";

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    logger.info("options", options);
  }, [options]);

  const handleSubmit = async event => {
    try {
      await pollsApi.create({
        poll: { title, options: JSON.stringify(options) }
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <PollForm
        title={title}
        setTitle={setTitle}
        options={options}
        setOptions={setOptions}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreatePoll;
