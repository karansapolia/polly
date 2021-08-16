import React, { useState, useEffect } from "react";
import { clone } from "ramda";

import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type = "create",
  title,
  setTitle,
  options,
  setOptions,
  loading,
  handleSubmit
}) => {
  const [localOptions, setLocalOptions] = useState(options);

  useEffect(() => {
    setOptions(localOptions);
  }, [localOptions]);

  const handleOptions = (optionType, value) => {
    let options = clone(localOptions);
    logger.info("handleOptions fired");
    logger.info(optionType, value);
    options[optionType] = value;
    logger.info(options);
    setLocalOptions(options);
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Poll title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Input
        label="Option 1"
        placeholder="Option 1 value"
        value={localOptions[0] || ""}
        onChange={e => handleOptions(0, e.target.value)}
      />
      <Input
        label="Option 2"
        placeholder="Option 2 value"
        value={localOptions[1] || ""}
        onChange={e => handleOptions(1, e.target.value)}
      />
      <Input
        label="Option 3"
        placeholder="Option 3 value"
        value={localOptions[2] || ""}
        onChange={e => handleOptions(2, e.target.value)}
      />
      <Input
        label="Option 4"
        placeholder="Option 4 value"
        value={localOptions[3] || ""}
        onChange={e => handleOptions(3, e.target.value)}
      />
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Poll" : "Update poll"}
        loading={loading}
      />
    </form>
  );
};

export default PollForm;
