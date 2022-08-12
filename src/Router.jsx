import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import Topics from './components/Topics';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[400],
    },
    secondary: {
      main: deepPurple[100],
    },
  },
});

const Router = () => {
  const [topic, setTopic] = useState('react');
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header setTopic={setTopic} topic={topic} />
        <Routes>
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topic" element={<Topics />} />
          <Route exact path="/" element={<Topics />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
