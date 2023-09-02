import { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

import {
  BrandLogo,
  AdminHomeLogo,
  AdminHomeActiveLogo,
  AdminUserListLogo,
  AdminUserListActiveLogo,
  LogoutIcon,
} from "../../assets/icons";

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
  const id = localStorage.getItem("id");

  return (
    <NavbarContainer className="NavbarConainer">
      <div className="navbarStyle">
        <BrandLogo className="logo" />
      </div>
      <LinkStyle>
        <NavLink
          className="adminHome-icon"
          to={`/admin/tweets`}
          style={({ isActive }) => ({ color: isActive && "#FF6600" })}
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <AdminHomeActiveLogo />
              </>
            ) : (
              <>
                <AdminHomeLogo />
              </>
            )
          }
        </NavLink>
      </LinkStyle>
      <LinkStyle>
        <NavLink
          className="adminUserList-icon"
          to={`/admin/users`}
          style={({ isActive }) => ({ color: isActive && "#FF6600" })}
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <AdminUserListActiveLogo />
              </>
            ) : (
              <>
                <AdminUserListLogo />
              </>
            )
          }
        </NavLink>
      </LinkStyle>
      <LinkStyle className="logout">
        <LogoutIcon />
        <Link className="outIcon" to="/admin/login">
          登出
        </Link>
      </LinkStyle>
    </NavbarContainer>
  );
}

export default Navbar;
