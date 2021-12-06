import styled, { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }
`

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

export const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }

  & button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
  }
`

export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`

export const Indicator = styled.div`
  text-align: center;
  padding-top: 20px;
  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background-color: #313131;
    display: inline-block;
    text-align: center;
  }
`
