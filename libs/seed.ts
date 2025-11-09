import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed process...");

  // Clear existing data (in reverse order due to foreign key constraints)
  await prisma.interview.deleteMany();
  await prisma.application.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.company.deleteMany();
  // await prisma.user.deleteMany();

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "john.doe@example.com",
        name: "John Doe",
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        email: "jane.smith@example.com",
        name: "Jane Smith",
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        email: "admin@example.com",
        name: "Admin User",
        role: "ADMIN",
      },
    }),
    prisma.user.create({
      data: {
        email: "alex.johnson@example.com",
        name: "Alex Johnson",
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        email: "sarah.wilson@example.com",
        name: "Sarah Wilson",
        role: "USER",
      },
    }),
  ]);

  console.log("✅ Created users:", users.length);

  // Create companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: "Google",
        homepage_url: "https://www.google.com",
      },
    }),
    prisma.company.create({
      data: {
        name: "Microsoft",
        homepage_url: "https://www.microsoft.com",
      },
    }),
    prisma.company.create({
      data: {
        name: "Apple",
        homepage_url: "https://www.apple.com",
      },
    }),
    prisma.company.create({
      data: {
        name: "Meta",
        homepage_url: "https://www.meta.com",
      },
    }),
    prisma.company.create({
      data: {
        name: "Amazon",
        homepage_url: "https://www.amazon.com",
      },
    }),
    prisma.company.create({
      data: {
        name: "Netflix",
        homepage_url: "https://www.netflix.com",
      },
    }),
    prisma.company.create({
      data: {
        name: "Spotify",
        homepage_url: "https://www.spotify.com",
      },
    }),
    prisma.company.create({
      data: {
        name: "Airbnb",
        homepage_url: "https://www.airbnb.com",
      },
    }),
  ]);

  console.log("✅ Created companies:", companies.length);

  // Create resumes
  const resumes = await Promise.all([
    prisma.resume.create({
      data: {
        name: "John Doe - Software Engineer Resume",
        url: "https://example.com/resumes/john-doe-resume.pdf",
      },
    }),
    prisma.resume.create({
      data: {
        name: "Jane Smith - Frontend Developer Resume",
        url: "https://example.com/resumes/jane-smith-resume.pdf",
      },
    }),
    prisma.resume.create({
      data: {
        name: "Alex Johnson - Full Stack Developer Resume",
        url: "https://example.com/resumes/alex-johnson-resume.pdf",
      },
    }),
    prisma.resume.create({
      data: {
        name: "Sarah Wilson - Data Scientist Resume",
        url: "https://example.com/resumes/sarah-wilson-resume.pdf",
      },
    }),
    prisma.resume.create({
      data: {
        name: "John Doe - Updated Resume 2024",
        url: "https://example.com/resumes/john-doe-resume-2024.pdf",
      },
    }),
  ]);

  console.log("✅ Created resumes:", resumes.length);

  // Create applications
  const applications = await Promise.all([
    // John Doe's applications
    prisma.application.create({
      data: {
        user_id: users[0].id,
        company_id: companies[0].id, // Google
        resume_id: resumes[0].id,
        linkedIn_Url: "https://linkedin.com/in/johndoe",
        apply_site_url: "https://careers.google.com/jobs/results/1234567890",
        job_title: "Senior Software Engineer",
        job_type: "FULL_TIME",
        position_level: "SENIOR",
        position_type: "FULL_STACK",
        interview_status: "INTERVIEW",
        status: "PROCESSING",
        comments: "Applied through referral. Very interested in this role.",
      },
    }),
    prisma.application.create({
      data: {
        user_id: users[0].id,
        company_id: companies[1].id, // Microsoft
        resume_id: resumes[0].id,
        linkedIn_Url: "https://linkedin.com/in/johndoe",
        apply_site_url: "https://careers.microsoft.com/us/en/job/1234567",
        job_title: "Software Engineer II",
        job_type: "FULL_TIME",
        position_level: "INTERMEDIATE",
        position_type: "BACKEND",
        interview_status: "SENT_RESUME",
        status: "PROCESSING",
        comments: "Applied online. Waiting for response.",
      },
    }),
    prisma.application.create({
      data: {
        user_id: users[0].id,
        company_id: companies[2].id, // Apple
        resume_id: resumes[4].id, // Updated resume
        linkedIn_Url: "https://linkedin.com/in/johndoe",
        apply_site_url: "https://jobs.apple.com/en-us/details/123456789",
        job_title: "iOS Developer",
        job_type: "FULL_TIME",
        position_level: "SENIOR",
        position_type: "MOBILE",
        interview_status: "OFFER_INTERVIEW",
        status: "APPROVED",
        comments: "Great interview process. Received offer!",
      },
    }),

    // Jane Smith's applications
    prisma.application.create({
      data: {
        user_id: users[1].id,
        company_id: companies[3].id, // Meta
        resume_id: resumes[1].id,
        linkedIn_Url: "https://linkedin.com/in/janesmith",
        apply_site_url: "https://www.metacareers.com/jobs/1234567890",
        job_title: "Frontend Engineer",
        job_type: "FULL_TIME",
        position_level: "SENIOR",
        position_type: "FRONTEND",
        interview_status: "INTERVIEW",
        status: "PROCESSING",
        comments: "Technical interview scheduled for next week.",
      },
    }),
    prisma.application.create({
      data: {
        user_id: users[1].id,
        company_id: companies[4].id, // Amazon
        resume_id: resumes[1].id,
        linkedIn_Url: "https://linkedin.com/in/janesmith",
        apply_site_url: "https://www.amazon.jobs/en/jobs/1234567890",
        job_title: "Software Development Engineer",
        job_type: "FULL_TIME",
        position_level: "INTERMEDIATE",
        position_type: "FULL_STACK",
        interview_status: "SENT_RESUME",
        status: "FAILED",
        failed_reason: "Did not meet the technical requirements",
        failed_at: new Date("2024-01-15"),
        comments: "Applied but didn't pass the initial screening.",
      },
    }),

    // Alex Johnson's applications
    prisma.application.create({
      data: {
        user_id: users[3].id,
        company_id: companies[5].id, // Netflix
        resume_id: resumes[2].id,
        linkedIn_Url: "https://linkedin.com/in/alexjohnson",
        apply_site_url: "https://jobs.netflix.com/jobs/1234567890",
        job_title: "Senior Software Engineer",
        job_type: "FULL_TIME",
        position_level: "SENIOR",
        position_type: "BACKEND",
        interview_status: "INTERVIEW",
        status: "PROCESSING",
        comments: "Great culture fit interview. Waiting for next round.",
      },
    }),
    prisma.application.create({
      data: {
        user_id: users[3].id,
        company_id: companies[6].id, // Spotify
        resume_id: resumes[2].id,
        linkedIn_Url: "https://linkedin.com/in/alexjohnson",
        apply_site_url: "https://www.lifeatspotify.com/jobs/1234567890",
        job_title: "Full Stack Engineer",
        job_type: "CONTRACT",
        position_level: "SENIOR",
        position_type: "FULL_STACK",
        interview_status: "SENT_RESUME",
        status: "NO_RESPONSE",
        comments: "Applied 2 weeks ago, no response yet.",
      },
    }),

    // Sarah Wilson's applications
    prisma.application.create({
      data: {
        user_id: users[4].id,
        company_id: companies[7].id, // Airbnb
        resume_id: resumes[3].id,
        linkedIn_Url: "https://linkedin.com/in/sarahwilson",
        apply_site_url: "https://careers.airbnb.com/positions/1234567890",
        job_title: "Data Scientist",
        job_type: "FULL_TIME",
        position_level: "SENIOR",
        position_type: "DATA_SCIENCE",
        interview_status: "OFFER_ACCEPTED",
        status: "APPROVED",
        comments: "Accepted the offer! Starting next month.",
      },
    }),
    prisma.application.create({
      data: {
        user_id: users[4].id,
        company_id: companies[0].id, // Google
        resume_id: resumes[3].id,
        linkedIn_Url: "https://linkedin.com/in/sarahwilson",
        apply_site_url: "https://careers.google.com/jobs/results/9876543210",
        job_title: "Machine Learning Engineer",
        job_type: "FULL_TIME",
        position_level: "SENIOR",
        position_type: "AI",
        interview_status: "INTERVIEW",
        status: "PROCESSING",
        comments: "Technical interview was challenging but went well.",
      },
    }),
  ]);

  console.log("✅ Created applications:", applications.length);

  // Create interviews
  const interviews = await Promise.all([
    // Interviews for John Doe's Google application
    prisma.interview.create({
      data: {
        application_id: applications[0].id,
        interview_date: new Date("2024-02-15T10:00:00Z"),
        interview_location: "Virtual - Google Meet",
        interview_notes:
          "Technical coding interview. Solved 2 medium-level problems.",
        interview_feedback:
          "Strong technical skills, good problem-solving approach.",
      },
    }),
    prisma.interview.create({
      data: {
        application_id: applications[0].id,
        interview_date: new Date("2024-02-20T14:00:00Z"),
        interview_location: "Virtual - Google Meet",
        interview_notes:
          "System design interview. Discussed scalable architecture.",
        interview_feedback: "Good understanding of system design principles.",
      },
    }),

    // Interview for John Doe's Apple application
    prisma.interview.create({
      data: {
        application_id: applications[2].id,
        interview_date: new Date("2024-01-25T09:00:00Z"),
        interview_location: "Apple Campus, Cupertino",
        interview_notes:
          "Final round interview with hiring manager and team lead.",
        interview_feedback: "Excellent cultural fit and technical expertise.",
      },
    }),

    // Interview for Jane Smith's Meta application
    prisma.interview.create({
      data: {
        application_id: applications[3].id,
        interview_date: new Date("2024-02-10T11:00:00Z"),
        interview_location: "Virtual - Zoom",
        interview_notes: "React and JavaScript deep dive. Live coding session.",
        interview_feedback: "Strong frontend skills, good React knowledge.",
      },
    }),

    // Interview for Alex Johnson's Netflix application
    prisma.interview.create({
      data: {
        application_id: applications[5].id,
        interview_date: new Date("2024-02-12T13:00:00Z"),
        interview_location: "Netflix Los Gatos Office",
        interview_notes:
          "Backend systems interview. Discussed microservices architecture.",
        interview_feedback:
          "Solid backend experience, good communication skills.",
      },
    }),

    // Interview for Sarah Wilson's Google application
    prisma.interview.create({
      data: {
        application_id: applications[8].id,
        interview_date: new Date("2024-02-08T15:00:00Z"),
        interview_location: "Virtual - Google Meet",
        interview_notes:
          "ML algorithms and statistics interview. Whiteboard session.",
        interview_feedback:
          "Strong mathematical foundation, good ML knowledge.",
      },
    }),
  ]);

  console.log("✅ Created interviews:", interviews.length);

  console.log("🎉 Seed completed successfully!");
  console.log(
    `Created ${users.length} users, ${companies.length} companies, ${resumes.length} resumes, ${applications.length} applications, and ${interviews.length} interviews`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
