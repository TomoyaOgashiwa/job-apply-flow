import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import LandingHeader from "@/components/header/landing-header";
import Heading from "@/components/ui/heading";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <LandingHeader />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="animate-fade-in-up">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-800 dark:text-blue-200 mb-8">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                Streamline Your Job Application Process
              </div>

              <Heading
                level="h1"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              >
                Manage Your{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Job Applications
                </span>{" "}
                Like a Pro
              </Heading>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Track applications, manage deadlines, and never miss an
                opportunity. Your career journey deserves better organization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/auth/signup">Get Started Free</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50"
      >
        <div className="container mx-auto">
          <div className="animate-fade-in-up delay-200">
            <div className="text-center mb-16">
              <Heading
                level="h2"
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Everything You Need to Succeed
              </Heading>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Powerful features designed to help you stay organized and never
                miss an opportunity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-slate-700">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <Heading
                  level="h3"
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                >
                  Application Tracking
                </Heading>
                <p className="text-gray-600 dark:text-gray-300">
                  Keep track of all your job applications in one place. Never
                  lose sight of where you've applied.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-slate-700">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <Heading
                  level="h3"
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                >
                  Deadline Management
                </Heading>
                <p className="text-gray-600 dark:text-gray-300">
                  Set reminders and track important deadlines. Never miss an
                  interview or application deadline again.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-slate-700">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <Heading
                  level="h3"
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                >
                  Progress Analytics
                </Heading>
                <p className="text-gray-600 dark:text-gray-300">
                  Visualize your application progress with insightful analytics
                  and identify areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="animate-fade-in-up delay-400">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center">
              <Heading
                level="h2"
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Ready to Take Control of Your Career?
              </Heading>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have streamlined their job
                application process.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/signup">Start Your Journey Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="animate-fade-in-up delay-600">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JF</span>
                  </div>
                  <span className="text-xl font-bold">JobFlow</span>
                </div>
                <p className="text-gray-400 max-w-md">
                  Empowering job seekers with the tools they need to manage
                  their applications effectively and land their dream job.
                </p>
              </div>

              <div>
                <Heading level="h3" className="font-semibold mb-4">
                  Product
                </Heading>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      href="#features"
                      className="hover:text-white transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className="hover:text-white transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Updates
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <Heading level="h3" className="font-semibold mb-4">
                  Support
                </Heading>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      href="#contact"
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 JobFlow. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
