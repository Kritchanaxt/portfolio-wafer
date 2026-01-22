export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I'm a collaborative Software Engineer passionate about AI and mobile innovation.",
    description: "",
    className: "lg:col-span-2 md:col-span-5 md:row-span-4 lg:min-h-[90vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-3 md:col-span-3 md:row-span-2 min-h-[50vh]",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-3 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently working on MindcareAI",
    description: "Mental Health App",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "MindcareAI - Mental Health App",
    des: "Mental Health Consultation App. iOS app using SwiftUI and scalable backend with Gin, gRPC, MongoDB, and Redis. Features secure API Gateway and real-time communication.",
    img: "/p1.svg",
    iconLists: ["/dock.svg", "/cloud.svg", "/app.svg"],
    link: "https://github.com/kritchanat",
  },
  {
    id: 2,
    title: "SMARTSIGN - AI Sign Language",
    des: "Real-time sign language detection using AI. Integrated with video streaming and low-latency API communication. Award winning project at NSC 2025.",
    img: "/p2.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg"],
    link: "https://github.com/kritchanat",
  },
  {
    id: 3,
    title: "macOS API Vision & OCR",
    des: "Internship project: Developed macOS API Vision for Text Recognition, Face/Card Detection. Integrated ML Kit and Tesseract OCR for cross-platform solutions.",
    img: "/p3.svg",
    iconLists: ["/c.svg", "/ts.svg"],
    link: "https://github.com/kritchanat",
  },
  {
    id: 4,
    title: "Portfolio Website",
    des: "A modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion to showcase my projects and skills.",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg"],
    link: "https://github.com/kritchanat",
  },
];

export const testimonials = [
  {
    quote:
      "Working with Kritchanat was a great experience. He is a talented engineer with a strong passion for AI and mobile development.",
    name: "Colleague",
    title: "Software Engineer",
  },
];

export const companies = [
  {
    id: 1,
    img: "/yappix.svg",
  },
  {
    id: 2,
    img: "/mybuyer.svg",
  },
  {
    id: 3,
    img: "/projectorium.svg",
  },
  {
    id: 4,
    img: "/sk.svg",
  },
  {
    id: 5,
    img: "/hub.svg",
  },
  {
    id: 6,
    img: "/teez.svg",
  },
  {
    id: 7,
    img: "/it.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Software Engineer - MindcareAI",
    desc: "Nov 2025 - Present. Building iOS app with SwiftUI and backend microservices using Gin, gRPC, and MongoDB. Implementing secure API Gateway and CI/CD pipelines.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
  {
    id: 2,
    title: "Full-Stack Developer - SMARTSIGN",
    desc: "Aug 2025 - Dec 2025. Designed UI/UX and developed full-stack solution for AI sign language detection. Award-winning project at NSC 2025 and EEC Hackathon.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Mobile Developer Intern - Indistinct Co.",
    desc: "Apr 2025 - Jun 2025. Developed mobile features using modern frameworks. Integrated real-time APIs, macOS Vision API, and ML Kit for OCR and detection.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp1.svg",
  },
  {
    id: 4,
    title: "Student - Kasetsart University",
    desc: "2023 - Present. Digital Science and Technology. Achieved 3.37 GPA. Active participant in hackathons and innovation competitions.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/kritchanat",
  },
  {
    id: 2,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/kritchanat",
  },
  {
    id: 3,
    img: "/twit.svg",
    link: "mailto:kritchanat.dev@gmail.com",
  },
];
