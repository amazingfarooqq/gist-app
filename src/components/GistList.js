import React from "react";
import { GistContextAPI } from "../features/contextapi";
import Gist from "./Gist";
import Octicon from "react-octicon";

const GistList = () => {
  const { gists, loading, fetchGists } = GistContextAPI();

  if (loading) {
    return <p>Loading gists...</p>;
  }

  return (
    <div style={{ padding: "0px 10px", }}>
      <h2 >Gist List {`( ${gists?.length} )`}</h2>
      {gists.length === 0 ? (
        <>
          <p>No gists found.</p>
          <button onClick={() => fetchGists("")}>Refresh</button>
        </>
      ) : (
        gists.map((gist, index) => (
          <div key={gist.id}>
            <Gist gist={gist} index={index} />
          </div>
        ))
      )}
    </div>
  );
};

export default GistList;
