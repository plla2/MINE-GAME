import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 15px 15px 6px 15px;
  background-color: ${({ theme }) => theme.color.controller_bg};
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: ${({ theme }) => theme.shadow.box_shadow};
  button {
    padding: 4px 7px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.color.cell_open};
    border: 2px solid ${({ theme }) => theme.color.controller_border};
    color: ${({ theme }) => theme.color.font_color};
    font-size: 16px;
    font-weight: 600;
    &:hover {
      background-color: ${({ theme }) => theme.color.hover_color};
      transition: 0.6s ease;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  p {
    font-size: 20px;
    font-weight: 800;
    margin-left: 20px;
    color: ${({ theme }) => theme.color.font_color};
  }
  img {
    width: 45px;
    height: 45px;
  }
`;

export const LevelWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px dotted ${({ theme }) => theme.color.cell_border};
  span {
    margin-right: 20px;
    color: ${({ theme }) => theme.color.title_color};
    font-weight: 600;
    font-size: 17px;
  }
  button {
    margin-right: 20px;
  }
`;

export const CustomWrapper = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px dotted ${({ theme }) => theme.color.cell_border};
  .custom_content {
    display: flex;
    flex-direction: column;
  }
  span {
    color: ${({ theme }) => theme.color.title_color};
    font-weight: 600;
  }
  .inputs {
    display: flex;
    align-items: center;
    width: 176px;
    justify-content: space-between;
    color: ${({ theme }) => theme.color.font_color};
    margin-bottom: 5px;
    margin-top: 5px;
    input {
      width: 50px;
      border: none;
      background-color: ${({ theme }) => theme.color.cell_open};
      border: 1px solid ${({ theme }) => theme.color.controller_border};
      border-radius: 4px;
    }
  }
  button {
    margin-left: 30px;
    height: 100%;
  }
`;

export const Timer = styled.div`
  display: flex;
  padding-top: 5px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  span {
    color: ${({ theme }) => theme.color.title_color};
    font-weight: 600;
  }
  button {
    background-color: #fa9884;
  }
`;
