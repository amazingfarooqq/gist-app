import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Octicon from "react-octicon";
import Comments from "./Comments";
import axios from "axios";

const GistCard = ({ gist, index }) => {
  const {
    files,
    comments,
    comments_url,
    forks,
    stars,
    owner,
    forks_url,
    description,
    created_at,
    updated_at,
  } = gist;

  const [isComment, setIsComment] = useState(true)
  const [isFiles, setIsFiles] = useState(true)

  const options = { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
  
  const created_at_date = new Date(created_at);
  const createdDate_formatted = created_at_date.toLocaleDateString("en-US", options);

  const updated_at_date = new Date(updated_at);
  const updatedDate_formatted = updated_at_date.toLocaleDateString("en-US", options);
  

  // converting object to array to map over it
  const keyValuePairs = Object.entries(files).map(([key, value]) => (
    
    <GistFileListing key={key}
      onClick={() =>
        window.open(value.raw_url, "_blank")
      }
      > <Octicon name="file" style={{ fontSize: '14px' }}/> {`${key}`}</GistFileListing>
  ));

  return (
    <GistCardContainer>
      <GistHeader>
        <div style={{ display: "flex" }}>
          <GistImage src={owner.avatar_url} alt={gist.owner.login} />
          <GistTitle>{owner.login}</GistTitle>
        </div>
        <GistButtonContainer>
          <GistButton onClick={() => setIsFiles(!isFiles)}>
            <Octicon name="file" style={{ fontSize: '14px' }}/> {Object.keys(files).length} File/s
          </GistButton>
          <GistButton onClick={() => setIsComment(!isComment)}>
            <Octicon name="comment" style={{ fontSize: '14px' }}/> {comments} Comment/s
          </GistButton>
          <GistButton onClick={() => window.open(forks_url, "_blank")}>
            <Octicon name="repo-forked" style={{ fontSize: '14px' }}/> {forks} Forks
          </GistButton>
        </GistButtonContainer>
      </GistHeader>
      <GistDateTime>
        Created At: {createdDate_formatted} | Last Updated: {updatedDate_formatted}
      </GistDateTime>

      {description && <GistDesc>{description}</GistDesc>}
      <GistFooter>
        {isFiles &&
          <GistFileList>  {keyValuePairs}</GistFileList>
        }
        {comments > 0 &&
          <Comments comments={comments} comments_url={comments_url} owner={owner} isComment={isComment}/>
        }
      </GistFooter>
    </GistCardContainer>
  );
};

export default GistCard;


const GistCardContainer = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  max-width: 600px;
`;

const GistHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;


const GistImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const GistTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GistButtonContainer = styled.div`
  display: flex;
`;

const GistButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 4px;
  color: #0366d6;
  font-size: 12px;
  padding: 3px;
  margin-left: 8px;
  cursor: pointer;
`;

const GistDateTime = styled.p`
  margin: 0;
  font-style: italic;
`;

const GistDesc = styled.p`
  margin: 0;
  font-size: 15px
`

const GistFooter = styled.div`
  font-size: 12px;
  //   text-align: center;
`;

const GistFileList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`;

const GistFileListing = styled.li`
  cursor: pointer;
  padding: 3px;
  color: #0366d6;
  font-size: 10px
`;
