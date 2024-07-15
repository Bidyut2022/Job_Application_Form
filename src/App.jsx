import React from 'react';
import JobApplicationForm from './components/JobApplicationForm';

function App() {
  return (
    <div className="App h-screen w-full ">
      <header className="App-header ">
        <h1 className="text-3xl text-center text-white p-1 bg-indigo-600 py-5 font-bold mb-6">Job Application</h1>
        <JobApplicationForm />
      </header>
    </div>
  );
}

export default App;
