import { React, useContext, useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import {
  BrandLogo,
  ProfileIcon,
  ProfileIconActive,
  SettingIcon,
  SettingIconActive,
  HomeIcon,
  HomeIconActive,
  LogoutIcon,
} from "../../assets/icons";
import SideBarModal from "../profile/SideBarModal";
import { StyledNavbarButton } from "../common/button.styled";
import { ShowModalContext } from "../../Context/ShowModalContext";
import { useUserPostModal } from "../../Context/MainPageContext";

const NavbarContainer = styled.div`
  /* width: 350px; */

  .navbarStyle {
    width: 178px;
    margin-left: 113px;
    margin-right: 24px;
  }
  .logo {
    margin: 15px;
  }
`;

const LinkStyle = styled.div`
  padding: 16px;

  a {
    width: 120px;
    display: flex;
    align-items: center;
    color: var(--nav-unactive_gray);
    text-decoration: none;
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
    cursor: pointer;
  }

  span {
    margin-left: 18px;
    font-weight: 700;
    cursor: pointer;
  }

  &.logout {
    display: flex;
    align-items: center;
    padding: 16px;
    position: relative;
    top: 500px;
    cursor: pointer;
  }
  .outIcon {
    margin-left: 18px;
    font-weight: 700;
  }
`;

function Navbar() {
  // const [text, setText] = useState("");
  // const [userTextNothing, setUserTextNoting] = useState(false);
  const { showPostModal, toggleShowPostModal } = useContext(ShowModalContext);
  const { onAddHomeList } = useUserPostModal();
  const id = localStorage.getItem("id");

  return (
    <NavbarContainer className="NavbarContainer">
      <div className="navbarStyle">
        <BrandLogo className="logo" />
        <LinkStyle>
          <NavLink
            className="home_icon"
            to={`home`}
            style={({ isActive }) => ({ color: isActive && "#FF6600" })}
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <HomeIconActive />
                  <span>首頁</span>
                </>
              ) : (
                <>
                  <HomeIcon />
                  <span>首頁</span>
                </>
              )
            }
          </NavLink>
        </LinkStyle>
        <LinkStyle>
          <NavLink
            className="user_icon"
            to={`users`}
            onClick={() => {
              localStorage.setItem("otherId", id);
              return;
            }}
            style={({ isActive }) => ({ color: isActive && "#FF6600" })}
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <ProfileIconActive />
                  <span>個人資料</span>
                </>
              ) : (
                <>
                  <ProfileIcon />
                  <span>個人資料</span>
                </>
              )
            }
          </NavLink>
        </LinkStyle>
        <LinkStyle>
          <NavLink
            className="setting_icon"
            to={"setting"}
            style={({ isActive }) => ({ color: isActive && "#FF6600" })}
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <SettingIconActive />
                  <span>設定</span>
                </>
              ) : (
                <>
                  <SettingIcon />
                  <span>設定</span>
                </>
              )
            }
          </NavLink>
        </LinkStyle>
        <StyledNavbarButton className="bigButton" onClick={toggleShowPostModal}>
          推文
        </StyledNavbarButton>
        <LinkStyle className="logout">
          <LogoutIcon />
          <Link className="outIcon" to="login">
            登出
          </Link>
        </LinkStyle>
      </div>
      {showPostModal && <SideBarModal onAddHomeList={onAddHomeList} />}
    </NavbarContainer>
  );
}

export default Navbar;
