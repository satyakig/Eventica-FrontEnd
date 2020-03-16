import { Button, Container, Dialog, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const StyledContainer = styled(Container)`
  padding-top: 24px;
  padding-bottom: 24px;
  height: 60vh;
`;

export const Title = styled(Typography)`
  font-size: 25px;
  padding: 8px;
`;

export const Heading = styled(Typography)`
  font-size: 18px;
  padding-top: 8px;
  font-weight: bold;
`;

export const CommentField = styled(TextField)`
  padding-top: 8px;
`;

export const SendButton = styled(Button)`
  height: 100%;
`;
