import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import wrapper from '../store/configureStore'
import Head from 'next/head'

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App)

//중복되는 코드는 여기에 작성함.
//_app.js는 자동으로 최상위가 된다.
//antd는 여기서 css파일이 추가되는 거고 antd의 Menu는 AppLayout에서 가지고 오는걸 각 컴포넌트에 추가해주는 형태이다.
//Head를 다른 곳에서 쓰고 싶다고 여기다가 import를 해서 다른 곳에서도
//Head를 Import안하는건 아니다. import를 할 곳이면 다 import를 해야한다.
