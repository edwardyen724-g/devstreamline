import React from 'react';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DevStreamline',
  description: 'Effortlessly enhance your coding workflow with tailored tools for developers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">Transform Your Development Workflow Today!</h1>
            <p className="mt-2">MVP Features:</p>
            <ul className="list-disc ml-6">
              <li>IDE integration for automated task reminders and updates</li>
              <li>Version control insights directly within the IDE</li>
              <li>Onboarding checklist generator for new team members</li>
              <li>Resource allocation visualizer to manage workloads effectively</li>
              <li>Customizable keyboard shortcuts to streamline repetitive tasks</li>
            </ul>
          </header>
          <main className="p-4">{children}</main>
          <footer className="bg-gray-200 text-center p-4">
            <p>© {new Date().getFullYear()} DevStreamline. All rights reserved.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}