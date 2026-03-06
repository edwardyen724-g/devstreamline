import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Page: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Transform Your Development Workflow Today!</h1>
        <p className="mt-4 text-lg">Effortlessly enhance your coding workflow with tailored tools for developers.</p>
      </header>
      <section className="flex flex-col items-center">
        <Image src="/devstreamline-logo.png" alt="DevStreamline Logo" width={200} height={100} />
        <h2 className="text-2xl font-semibold mt-6">MVP Features</h2>
        <ul className="list-disc list-inside mt-4">
          <li>IDE integration for automated task reminders and updates</li>
          <li>Version control insights directly within the IDE</li>
          <li>Onboarding checklist generator for new team members</li>
          <li>Resource allocation visualizer to manage workloads effectively</li>
          <li>Customizable keyboard shortcuts to streamline repetitive tasks</li>
        </ul>
      </section>
      <footer className="mt-10">
        <Link href="/signup" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Get Started
        </Link>
      </footer>
    </main>
  );
};

export default Page;