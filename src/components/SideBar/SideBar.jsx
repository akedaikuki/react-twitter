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
// import SideBarModal from "../profile/SideBarModal";
import { StyledNavbarButton } from "../common/button.styled";
import { ShowModalContext } from "../../Context/ShowModalContext";

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
    position: absolute;
    bottom: 0;
    cursor: pointer;
  }
  .outIcon {
    margin-left: 18px;
    font-weight: 700;
  }
`;

function Navbar() {
  const { toggleShowPostModal } = useContext(ShowModalContext);

  return (
    <NavbarContainer className="NavbarContainer">
      <div className="navbarStyle">
        <BrandLogo className="logo" />
        <LinkStyle>
          <NavLink
            className="home_icon"
            to={`/`}
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
            to={"api/users/:UserId/tweets"}
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
            to={"/setting"}
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
          <Link className="outIcon" to="api/users/signin">
            登出
          </Link>
        </LinkStyle>
      </div>
      {/* <SideBarModal show={show} setShow={setShow} /> */}
    </NavbarContainer>
  );
}

export default Navbar;
