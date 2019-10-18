import styled from 'styled-components'
import hexToRgba from 'hex-to-rgba'

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: ${({size}) => size};
  height: ${({size}) => size};
  border: 1px solid ${({borderColor, borderOpacity}) => hexToRgba(borderColor, borderOpacity)};
  transition: border ${({animationTime}) => animationTime};
  ${({readOnly, borderColor}) => !readOnly && `
    &:hover {
      cursor: pointer;
      border: 1.2px solid ${hexToRgba(borderColor, 0.4)};
    }
  `}
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
