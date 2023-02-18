# 리액트로 재구축한 KALL 프로젝트 클라이언트 사이드
이전에 만들었던 2차 프로젝트를 3차 프로젝트에 돌입하면서 리액트로 변경. 모든 페이지를 리액트화함으로써 일관성 있는 데이터 관리 가능.

## 사용된 라이브러리
- 리액트(가장 기본이 되는 라이브러리.)
- 리액트 라우터 (리액트를 이용해 여러 페이지를 연결하는 것을 가능하게 해주는 라이브러리)
- 리액트 쿼리 (리액트 환경에서 서버사이드의 데이터를 관리할 수 있게 해주는 라이브러리)
- 액시오스 (리액트 쿼리와 함께 사용하는 프론트, 백엔드 통신 라이브러리)
- 리액트 쿠키 (리액트에서 쿠키를 관리할 수 있게 해주는 라이브러리)
- Emotion (스타일드 컴포넌트와 같은 CSS in JS 라이브러리)
- TailwindCSS (역시 CSS 라이브러리로 클래스 이름을 이용해 디자인을 할 수 있게 해주는 녀석)
- Twin.macro (위 두가지를 합쳐서 자유롭고 편하게 스타일링을 할 수 있게 해줌)

## 백엔드
- 스프링 부트 사용 예정
- 데이터베이스는 Mysql을 사용
- Mybatis를 사용하는 것으로 편리한 쿼리 관리 가능

## API 관련사항
- 홈페이지: [GET /products] 필요. 최근에 등록된 데이터순으로 6개 데이터.

## 코멘트
현재의 프론트는 서버가 제대로 된 구실을 갖추기 전까지는 임시 데이터를 사용하는 것으로 개발을 진행할 것임을 알림.

### 완료된 페이지
- [x] 홈페이지
- [x] 404 에러 페이지

### 예정 페이지
- [ ] 로그인
- [ ] 회원가입
  - [ ] 아이디 찾기
  - [ ] 비밀번호 찾기
- [ ] 상품 리스트
- [ ] 상품 상세 페이지
- [ ] 개인정보 처리방침
- [ ] 이용약관
- [ ] 마이페이지
- [ ] 커뮤니티
- [ ] 장바구니
- [ ] 주문
  - [ ] 주문 완료
- [ ] 회원 탈퇴
- [ ] 회원 정보 수정
