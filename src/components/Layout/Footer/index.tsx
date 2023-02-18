import React from 'react';
import { Link } from 'react-router-dom';
import { footerCopyStyle, footerLinksStyle, footerStyle } from './footerStyle';

export function Footer() {
  return (
    <>
      <footer css={footerStyle}>
        <div className='links' css={footerLinksStyle}>
          <Link to='/agreement'>이용약관</Link>
          <span>|</span><Link to='/privacy'>개인정보처리방침</Link>
          <span>|</span><Link to='/community/guide'>고객센터</Link>
        </div>
        <address className='site-address'>
          <p>
            <small>
              안내전화: 1588-9780
              <span>|</span> 상호 : KALL
            </small>
          </p>
        </address>
        <div className='site-info'>
          <p>
            <small>
              사업장소재지 : 경기 성남시 분당구 돌마로 46 (광천빌딩 5층)
            </small>
          </p>
          <p>
            <small>
              사업자등록번호 : 214-86-26812
              <span>|</span> 대표이사: 김상곤
            </small>
          </p>
          <p css={footerCopyStyle}>
            <small>
              COPYRIGHT <i className='far fa-copyright' /> KALL. ALL RIGHTS RESERVED.
            </small>
          </p>
        </div>
      </footer>
    </>
  );
}
