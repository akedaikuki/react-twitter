import styled from "styled-components";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminPostCard from "../components/Cards/AdminPostCard";
import * as style from "../components/common/admin.styled";

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
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()


    return (
        <>
           <Container>
                <Header>
                    <h4>推文清單</h4>
                    <h5>Test</h5>
                </Header>
                <CardContainer>
                    {posts.map(data => {
                        return(
                            <AdminPostCard
                               key={data.id}
                               name={data.User.name}
                               account={data.User.name}
                               avatar={data.User.avatar}
                               content={data.description}
                            />
                        )
                    })}
                </CardContainer>
           </Container>
        </>
    )
}