import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Tippy from "@tippyjs/react/headless";
import Menu from "./Menu";
const cx = classNames.bind(styles);
function Header({ username }) {
  return (
    <div>
      <Tippy
        offset={[0, 0]}
        interactive={true}
        placement="bottom-start"
        render={(attrs) => (
          <Menu className={cx("menu")} tabIndex="-1" {...attrs}></Menu>
        )}
      >
        <div className={cx("header")}>
          <h5 className={cx("title")}>{`Xin chào, ${username}`} </h5>
          <button className={cx("more-btn")}>
            <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
          </button>
        </div>
      </Tippy>
    </div>
  );
}

export default Header;
