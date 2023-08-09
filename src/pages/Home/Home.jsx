import React, { useState } from 'react';

// Page imports
import Trip from '../Trip/Trip';



export default function Home({ user }) {
  return (
    <div>
      <h1>Home Page</h1>
      <Trip user={user} />
    </div>
  );
} 