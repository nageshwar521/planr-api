import Input from '../../components/Input';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View``;

const Login = () => {
  return (
    <Container>
      <Input />
      <Input />
    </Container>
  );
};

export default Login;
