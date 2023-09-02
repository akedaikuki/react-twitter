import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPostCard from "../components/Cards/AdminPostCard";
import AdminSideBar from "../components/SideBar/AdminSideBar";
import * as style from "../components/common/admin.styled";

// get delete api
import { deleteTweet } from "../API/admin";
import { getTweets } from "../API/tweets";

const Container = styled.div`
  width: 83%;
  padding: 0;
  border: ${style.styledBorder};
  position: relative;
`

const Header = styled.div`
  width: 100%;
  height: 51px;
  margin-top: 24px;
  border-bottom: ${style.styledBorder};
  h4{
    font-weight: 700;
    font-size: 24px;
    margin-left: 24px;
  }
`

const CardContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default function AdminTweetPage() {
    const [tweetList, setTweetList] = useState([])
    const [status, setStatus] = useState('tweetList')
    const navigate = useNavigate()

    useEffect(() => {
      const getUserDataAsync = async (authToken) => {
        try {
          const data = await getTweets(authToken)
          setTweetList(data)
        } catch (error) {
          console.error(error)
        }
      }
      if (localStorage.getItem('authToken')) {
        getUserDataAsync(localStorage.getItem('authToken'))
      }
    }, [])

    const handleDelete = async (TweetId)=>{
      try{
        const success = await deleteTweet(TweetId);
        if (success) {
          setTweetList((prevTweetList) =>
          prevTweetList.filter((tweetList) =>
          tweetList.TweetId !== TweetId));
          console.log('Delete successful');
        } else {
          console.log('Delete failed');
          console.log(TweetId);
        }
      } catch (error){
        console.error("Delete Tweet Failed:", error)
      }
      
    }


    return (
        <>
                <AdminSideBar />
                <Container>
                <Header>
                    <h4>推文清單</h4>
                </Header>
                <CardContainer>
                    {tweetList.map( (item) => {
                        return(
                            <AdminPostCard
                               key={item.TweetId}
                               name={item.tweetOwnerName}
                               avatar={item.tweetOwnerAvatar}
                               account={item.tweetOwnerAccount}
                               content={item.description}
                               timestamp={item.createdAt}
                               onClick={()=>handleDelete(item.TweetId)}
                            />
                        )
                    })}
                </CardContainer>
                </Container>  
        </>
    )
}