import React, { useState } from "react";
import DropBlock from "./DropBlock";

const DropBlocksList = ({ dropBlocks, title }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  const filteredDropBlocks = dropBlocks.data.filter((block) =>
    block.dropname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* <center className="self-center text-3xl mb-5 font-bold text-black">
        <b>{title}</b>
      </center> */}
      <center>
        <input
          type="text"
          placeholder={"Search" + " " + title + "..."}
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-5 flex w-full focus:outline-none bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700 p-5 mb-4 "
        />
      </center>

      {filteredDropBlocks.map((block, index) => (
        <DropBlock
          key={index}
          dropname={block.dropname}
          dropbody={block.dropbody}
          tags={block.tags}
          userid={block.userid}
          username={block.username}
          dropid={block._id}
        />
      ))}
    </div>
  );
};

export default DropBlocksList;