import React from "react";

const ListPolls = ({ polls }) => {
  return (
    <div className="flex-column items-center justify-center border shadow-md mx-auto mt-12 md-8 px-2 py-4">
      <h3 className="text-3xl text-indigo-500">Polls</h3>
      {polls.map((poll, id) => (
        <div key={id} className="text-lg leading-5 text-center">
          <h3>{poll.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ListPolls;
