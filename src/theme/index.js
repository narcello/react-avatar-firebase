import styled from 'styled-components'

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 128px;
  height: 128px;
  border: 1px solid #e2e2e2;
  cursor: pointer;
  transition: border 0.3s;
  &:hover {
    border: 1.2px solid #000;
  }
  &:focus {
    outline: unset;
  
`
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 50%;
`
export {AvatarWrapper, ImageWrapper}
