import styled, { keyframes } from "styled-components";

function Skeleton() {
  return (
    <SkeletonWrapper>
      <SkeletonTitle />
      <SkeletonInfo>
        <SkeletonPhone />
        <SkeletonAddress />
      </SkeletonInfo>
    </SkeletonWrapper>
  );
}

const loading = keyframes`
0% {
        transform:  translateX(0);
    }
    50%,100%{
        transform:translateX(268px);
    }
`;

const LoadingAnimation = styled.div`
  overflow: hidden;
  position: relative;
  opacity: 0.5;

  &::before {
    content: "";
    width: 20px;
    height: 80px;
    position: absolute;
    background: linear-gradient(to right, #bdbdbd, #fff, #bdbdbd);
    animation: ${loading} 1.5s infinite linear;
  }
`;

const SkeletonWrapper = styled.li`
  display: flex;
  flex-direction: column;
  height: 80px;
  background-color: #fff;
  border-radius: 10px;
`;

const SkeletonTitle = styled(LoadingAnimation)`
  margin: 10px 0 20px 20px;
  width: 90px;
  height: 20px;
  background-color: #bdbdbd;
`;

const SkeletonInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const SkeletonPhone = styled(LoadingAnimation)`
  width: 90px;
  height: 20px;
  margin-left: 20px;
  background-color: #bdbdbd;
`;

const SkeletonAddress = styled(LoadingAnimation)`
  width: 140px;
  margin-right: 20px;
  background-color: #bdbdbd;
`;

export default Skeleton;
