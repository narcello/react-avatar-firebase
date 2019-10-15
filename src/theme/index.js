import styled from 'styled-components'

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: ${props => props.size};
  height: ${props => props.size};
  border: 1px solid ${props => props.borderColor};
  cursor: pointer;
  transition: border ${props => props.animationTime};
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
