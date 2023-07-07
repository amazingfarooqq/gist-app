import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Octicon from "react-octicon";
import axios from "axios";

const Comments = ({ comments, comments_url , owner, isComment}) => {

    const [commentsData, setCommentsData] = useState([])

    const getComments = async () => {
      const comments_url_resp = await axios.get(comments_url)
      setCommentsData(comments_url_resp.data)
      console.log(owner.login, comments_url_resp.data);
    }
  
    useEffect(() => {
      if(comments > 0){
        getComments()
      }
    },[])

  return (
    isComment &&
        <GistCardContainer>
        <GistHeader>{comments} Comment/s</GistHeader>
        <ul>
        {comments > 0 &&
            commentsData?.map((item) => {
            return <li key={item.id}>{item.body && item.body}</li>;
            })}
        </ul>
        </GistCardContainer>
    
  );
};

export default Comments;

const GistCardContainer = styled.div`
  padding: 6px 16px;
  width: 600px;
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

const GistDesc = styled.p`
  margin: 0;
  font-size: 15px;
`;

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
