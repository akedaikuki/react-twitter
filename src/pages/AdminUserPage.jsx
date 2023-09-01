import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminUserCard from "../components/Cards/AdminUserCard";
import AdminSideBar from "../components/SideBar/AdminSideBar";
import * as style from "../components/common/admin.styled";

// get api
import { getUsers } from "../API/admin";

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

export default function AdminUserPage() {
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState('users')
    const navigate = useNavigate()

    useEffect(() => {
        const getUsersAsync = async authToken => {
          try {
            const data = await getUsers(authToken)
            setUsers(data)
          } catch (error) {
            console.error(error)
          }
        }
        if (localStorage.getItem('authToken')) {
          getUsersAsync(localStorage.getItem('authToken'))
        }
      }, [])

    return (
        <>
           <div className="main">
            <AdminSideBar />
           <Container>
               <Header>
                   <h4>使用者列表</h4>
               </Header>
               <CardContainer>
                  {users.map( (item) => {
                    return(
                        <AdminUserCard
                            key={item.id}
                            name={item.name}
                            account={item.account}
                            avatar={item.avatar}
                            cover={item.cover}
                            follower={item.follower}
                            following={item.following}
                            tweetCount={item.tweetCount}
                            likeCount={item.likeCount}
                        />
                    )
                  })}
               </CardContainer>
           </Container>
           </div> 
        </>
    )  
}