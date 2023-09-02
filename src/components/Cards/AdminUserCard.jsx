import styled from "styled-components";
import { ReactComponent as LikeIconLogo } from "../../assets/icons/like-icon@24.svg";
import { ReactComponent as PostsLogo } from "../../assets/icons/posts-icon.svg";
import * as style from '../common/admin.styled';

const Container = styled.div`
    width: 210px;
    height: 314px;
    display: flex;
    border-radius: 10px 10px 0 0;
    background-color: ${style.colors.Gray};
    margin-left: 8px;
    margin-top: 8px;
    position: relative;
    .bg-img{
        width: 210px;
        margin-bottom: 86px;
        border-radius: 10px 10px 0px 0px;
    }
`

const InfoContainer = styled.div`
     width: 100px;
     position: absolute;
     top: 60px;
     left: 50px;
     margin: 0 auto;
     display: flex;
     flex-direction: column;
     align-items: center;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p{
        width: 180px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

    }
    .name{
        ${style.styledName}
    }
    .account{
        ${style.styledAccount}
    }
`

const InteractContainer = styled.div`
    width: 139px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 234px;
    left: 35px;
    div{
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
            margin: 0;
        }
    }
`

const FollowInfoContainer = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 268px;
    left: 26px;
    p{
        font-size: 14px;
        font-weight: 400;
        margin: 0 4px;
    }
`

export default function AdminUserCard({name, account, avatar, cover,  tweetCount, likeCount, follower, following}){
    return(
        <Container>
            <img src={cover} alt="background" className='bg-img'/>

            <InfoContainer>
                <img src={avatar} alt="avatar" />
                <p className='name'>{name}</p>
                <p className='account'>@{account}</p>
            </InfoContainer>
            <InteractContainer>
                <div>
                    <PostsLogo />
                    <p>{tweetCount}</p>
                </div>
                <div>
                    <LikeIconLogo />
                    <p>{likeCount}</p>
                </div>
            </InteractContainer>
            <FollowInfoContainer>
                <p>{following}位跟隨中</p>
                <p>{follower}位跟隨者</p>
            </FollowInfoContainer>
        </Container>
    )
}