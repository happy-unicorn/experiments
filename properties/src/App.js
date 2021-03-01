import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --content-background-color: gray;  
    --content-text-color: green;
    --default-text: 'Hello,';
  } 
  * {
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.main`
  height: 100vh;
  background-color: var(--parent-color, blue);
`;
const Wrapper = styled.article`
  --parent-color: green;
`;
const Content = styled.section`
  background-color: var(--content-background-color);
`;
const Text = styled.p`
  --box-shadow-color: yellow;
  box-shadow: 0 0 30px var(--box-shadow-color);
  color: var(--text-color, red);
  transition: color 2s linear;
  
  &::after {
    content: var(--default-text)' world!'
  }
  
  &:hover {
    --text-color: pink;
    --box-shadow-color: orange;
  }
`;

const App = () => {
  return (
    <Container>
      <GlobalStyle/>
      <Wrapper>
        <Content>
          <Text>
            Это просто изучение Custom Properties в CSS и :root в HTML
          </Text>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default App;
