import React, { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return !isAuthenticated ? (
    <>
      <h1>Hello, World!</h1>
    </>
  ) : (
    <>
      <h1>Hello, User!</h1>
    </>
  );
}

export default App;
