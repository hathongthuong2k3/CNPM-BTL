import React, { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function Menu() {
  

  return (
    <div className={cx('wrapper')}>
      <Link to={'/changepassword'} className={cx('change-pass')}>
        Đổi mật khẩu
      </Link>

      <Link to={'/payment'} className={cx('payment')}>
        Phương thức thanh toán
      </Link> 
      <Link to={'/'} className={cx('logout')} >
      Đăng xuất
      </Link> 
    </div>
  );
}

export default Menu;
