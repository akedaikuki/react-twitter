import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/icons/close-icon.svg";
import * as style from '../common/admin.styled';
import TimeGap from "../../utilities/timgap";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  border-bottom: ${style.styledBorder};
  img {
    ${style.styledImg}
    margin-left: 24px;
  }
`

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  .nmae {
    ${style.styledName}
  }
  .account {
    ${style.styledAccount}
  }
  .close {
    position: absolute;
    cursor: pointer;
  }
  & path {
    fill: #696974;
  }
`

const PostContainer = styled.div`
    height: 100%;
    flex: 1;
    margin-left: 8px;
    margin-right: 24px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .content {
        ${style.styledContentFont};
        height: auto;
        overflow-wrap: break-word;
    }
`

export default function AdminPostCard({avatar, name, account, content, onClick, timestamp}) {
    return (
        <Container>
            <img src={avatar} alt="avatar" />
            <PostContainer>
                <InfoContainer>
                    <p className="name">{name}</p>
                    <p className="account">@{account}・<TimeGap timestamp={timestamp} /></p>
                    <Close className="close" onClick={onClick} />
                </InfoContainer>
                <p className="content">{content}</p>
            </PostContainer>
        </Container>
    )
}