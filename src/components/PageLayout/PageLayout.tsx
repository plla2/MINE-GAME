import React from 'react';
import * as S from './PageLayoutStyle';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};

export default PageLayout;
