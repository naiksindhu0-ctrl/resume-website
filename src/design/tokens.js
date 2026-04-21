// ─────────────────────────────────────────────
//  Design Tokens  —  colors · fonts · easing
// ─────────────────────────────────────────────

export const theme = {
  bg: "#020207",
  bgCard: "#0D0D18",
  bgCard2: "#131325",
  accent: "#C8FF00",
  accent2: "#7B5EA7",
  accent3: "#FF6B6B",
  accent4: "#00D4FF",
  text: "#F0EDE6",
  textMuted: "#6A6880",
  border: "#1E1E32",
};

export const fonts = {
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace"
};
export const easing = "cubic-bezier(0.16,1,0.3,1)";

export const data = {
  name: "Aryan Mehta",
  title: "Full-Stack Engineer & Product Builder",
  email: "aryan.mehta@email.com",
  linkedin: "https://linkedin.com/in/aryanmehta",
  github: "https://github.com/aryangitmehta",
  location: "Bangalore, India",
  about: `I'm a full-stack engineer who obsesses over clean systems, beautiful interfaces, and scalable architecture. With 7+ years shipping products at startups and scale-ups, I've learned that the best code is the code users never notice — because everything just works.`,
  strengths: ["System Design", "Developer Experience", "Fast Shipping", "Team Leadership", "Open Source"],

  experience: [
    {
      company: "Razorpay",
      role: "Senior Software Engineer",
      duration: "Jan 2022 – Present",
      location: "Bangalore, India",
      color: "#C8FF00",
      points: [
        "Architected a real-time payment reconciliation system handling 2M+ transactions/day with 99.99% accuracy.",
        "Led a team of 6 to migrate monolith to microservices, reducing deploy time from 45min → 8min.",
        "Built a fraud detection ML pipeline that reduced chargebacks by 34% in Q3 2023.",
        "Introduced feature flagging and A/B testing infrastructure used across 15 product teams.",
      ],
    },
    {
      company: "Postman",
      role: "Software Engineer",
      duration: "Jul 2020 – Dec 2021",
      location: "Bangalore, India",
      color: "#FF6B6B",
      points: [
        "Owned the API test runner core — improved execution speed by 3× via parallel scheduling.",
        "Shipped collaborative environments feature used by 800K+ teams in first 6 months.",
        "Rebuilt the request builder UI in React, cutting render cycles by 60%.",
      ],
    },
    {
      company: "Freshworks",
      role: "Junior Engineer",
      duration: "Jun 2018 – Jun 2020",
      location: "Chennai, India",
      color: "#7B5EA7",
      points: [
        "Developed customer-facing dashboard serving 50K+ SMB users.",
        "Integrated third-party CRM APIs (Salesforce, HubSpot) via GraphQL federation.",
        "Wrote automated test suites, achieving 85% code coverage on critical paths.",
      ],
    },
  ],

  education: [
    { institution: "IIT Roorkee", degree: "B.Tech, Computer Science", year: "2014 – 2018", gpa: "8.7 / 10", color: "#C8FF00" },
    { institution: "Coursera / Stanford Online", degree: "Machine Learning Specialization", year: "2021", gpa: null, color: "#7B5EA7" },
  ],

  skills: {
    Languages: ["TypeScript", "Python", "Go", "Rust", "SQL"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "WebSockets"],
    Backend: ["Node.js", "FastAPI", "gRPC", "GraphQL", "Redis"],
    Infrastructure: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    Data: ["PostgreSQL", "MongoDB", "Kafka", "Elasticsearch", "dbt"],
  },

  skillLevels: {
    TypeScript: 95, Python: 88, Go: 72, React: 93, "Next.js": 85,
    "Node.js": 90, Docker: 80, AWS: 78, PostgreSQL: 85, Kafka: 70,
  },

  certifications: [
    { name: "AWS Solutions Architect", org: "Amazon Web Services", year: "2022", icon: "☁️", color: "#FF9900" },
    { name: "Certified Kubernetes Admin", org: "CNCF", year: "2023", icon: "⚙️", color: "#326CE5" },
    { name: "MongoDB Developer", org: "MongoDB University", year: "2021", icon: "🍃", color: "#00ED64" },
    { name: "Google Cloud Professional", org: "Google", year: "2022", icon: "🔵", color: "#4285F4" },
    { name: "GraphQL Associate", org: "Apollo", year: "2021", icon: "🔗", color: "#E535AB" },
    { name: "Terraform Associate", org: "HashiCorp", year: "2023", icon: "🟣", color: "#7B42BC" },
  ],

  projects: [
    { name: "OpenRoute", desc: "Open-source API gateway with built-in rate limiting, auth, and analytics. 2.4K GitHub stars.", tags: ["Go", "Redis", "Docker"], link: "https://github.com/aryangitmehta", color: "#C8FF00" },
    { name: "FlowDB", desc: "Visual database schema designer with AI-assisted normalization and SQL export.", tags: ["React", "TypeScript", "OpenAI"], link: "https://github.com/aryangitmehta", color: "#FF6B6B" },
    { name: "PricePulse", desc: "Real-time commodity price tracker with ML forecasts and mobile push alerts.", tags: ["Python", "FastAPI", "Kafka"], link: "https://github.com/aryangitmehta", color: "#7B5EA7" },
    { name: "DevDeck", desc: "Customizable developer dashboard aggregating GitHub, Jira, Slack, and CI/CD stats.", tags: ["Next.js", "GraphQL", "PostgreSQL"], link: "https://github.com/aryangitmehta", color: "#00D4FF" },
  ],
};