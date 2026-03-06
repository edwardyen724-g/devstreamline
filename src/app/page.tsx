import React from 'react';

const Page: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mt-10">Transform Your Development Workflow Today!</h1>
      <p className="text-lg mt-4 text-center max-w-2xl">
        Effortlessly enhance your coding workflow with tailored tools for developers.
      </p>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">MVP Features</h2>
        <ul className="list-disc mt-4 pl-5">
          <li>IDE integration for automated task reminders and updates</li>
          <li>Version control insights directly within the IDE</li>
          <li>Onboarding checklist generator for new team members</li>
          <li>Resource allocation visualizer to manage workloads effectively</li>
          <li>Customizable keyboard shortcuts to streamline repetitive tasks</li>
        </ul>
      </section>
      <button className="mt-10 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        Get Started
      </button>
    </main>
  );
};

export default Page;