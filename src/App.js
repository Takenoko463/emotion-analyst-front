import React from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import EmotionAnalyzer from "./components/EmotionAnalyzer";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Container fluid="md">
          <EmotionAnalyzer />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
