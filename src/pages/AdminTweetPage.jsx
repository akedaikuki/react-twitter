import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPostCard from "../components/Cards/AdminPostCard";
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
      if (localStorage.getItem('adminAuthToken')) {
        getUserDataAsync(localStorage.getItem('adminAuthToken'))
      }
    }, [])

  
    const handleDelete = async (id) => {
      try {
        const authToken = localStorage.getItem('adminAuthToken')
        await deleteTweet(id, authToken)
        console.log('刪除成功')
        setTweetList(tweetList.filter(item => item.TweetId !== id))
      } catch (error) {
        console.error(error)
      }
    }


    return (
        <>
           <Container>
                <Header>
                    <h4>推文清單</h4>
                </Header>
                <CardContainer>
                    {tweetList.map(data => {
                        return(
                            <AdminPostCard
                               key={data.id}
                               name={data.User.name}
                               account={data.User.name}
                               avatar={data.User.avatar}
                               content={data.description}
                               timestamp={data.createdAt}
                               onClick={() => handleDelete(data.id)}
                            />
                        )
                    })}
                </CardContainer>
           </Container>
        </>
    )
}