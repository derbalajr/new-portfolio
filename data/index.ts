export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "My Journey", link: "#experiences" },
  { name: "Contact", link: "#contact" },
];

export const heroData = {
  profileImg: "/omar.webp",
  name: "Omar Derbala",
  tagline: "Blending Laravel's Elegance with Next.js's Efficiency",
  title: "",
  description: "Developing Unique Ideas into State-of-the-Art Web Solutions",
};

export const skillCategories = [
  {
    id: 1,
    title: "Backend Development",
    description: "Building scalable, high-performance systems",
    skills: ["PHP", "Laravel", "Yii", "Node.js", "MySQL", "Redis", "RESTful APIs"],
    className: "lg:col-span-3 md:col-span-6 md:row-span-2",
    color: "primary"
  },
  {
    id: 2,
    title: "Frontend Technologies", 
    description: "Creating modern, responsive user interfaces",
    skills: ["React.js", "Next.js", "JavaScript", "HTML/CSS", "Tailwind CSS", "Bootstrap"],
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    color: "secondary"
  },
  {
    id: 3,
    title: "Architecture & DevOps",
    description: "Designing robust system architectures",
    skills: ["Microservices", "Clean Architecture", "DDD", "Docker", "Kubernetes", "CI/CD", "Linux"],
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    color: "accent"
  },
  {
    id: 4,
    title: "Current Focus",
    description: "Leading backend development at The Address Holding",
    skills: ["CRM-ERP Systems", "Performance Optimization"],
    className: "lg:col-span-3 md:col-span-6 md:row-span-1",
    color: "primary"
  },
  {
    id: 5,
    title: "Experience Level",
    description: "3+ years of professional development",
    skills: ["Senior Backend Engineer", "CRM-ERP Systems", "Government Projects", "E-commerce Platforms"],
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    color: "secondary"
  }
];

export const gridItems = [
  {
    id: 1,
    title: "I focus on client engagement, promoting honest exchange ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I’m open to different time zone meetings",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I’m committed to advancing",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech lover, passionate about crafting code.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "IBM Full Stack Software Developer Professional Certificate",
    description: "Currently Pursuing",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "How about starting a project together?",
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
    title: "Egyptian Customs Authority",
    des: "Digital transformation for Egypt's customs: modernizing and streamlining processes for efficiency.",
    img: "/customs.webp",
    iconLists: [
      "/laravel.svg",
      "/mysql.svg",
      "/next.svg",
      "/php.svg",
      "/gitlab.svg",
    ],
    link: "https://customs.gov.eg/",
    background: "/bg.png",
  },

  {
    id: 2,
    title: "Delecato",
    des: "E-commerce website for selling dates, nuts, and dried fruits in Germany",
    img: "/delecato.webp",
    iconLists: [
      "/wordpress.svg",
      "/woocommerce.svg",
      "/elementor.svg",
      "/mysql.svg",
      "/php.svg",
    ],
    link: "https://delecato.de/",
    background: "/bg.png",
  },
  {
    id: 3,
    title: "The Address ERP - CRM",
    des: "A fully customized internal CRM-ERP platform developed for The Address, a leading real estate company with over 6,000 employees.",
    img: "/tai.webp",
    iconLists: [
      "/laravel.svg",
      "/mysql.svg",
      "/react.svg",
      "/php.svg",
      "/github.svg",
    ],
    link: "https://mytai.app/login",
    background: "/bg.png",
  }, 
  {
    id: 4,
    title: "Welhof",
    des: "Welhof is an e-commerce platform offering affordable, eco-friendly refurbished home appliances with a focus on quality and customer satisfaction",
    img: "/welhof-website.webp",
    iconLists: [
      "/yii.svg",
      "/mysql.svg",
      "/javascript.svg",
      "/php.svg",
      "/github.svg",
    ],
    link: "https://www.welhof.com/nl_nl/",
    background: "/bg.png",
  },
];

export const testimonials = [
  {
    quote:
      "Omar has been an invaluable asset to our team. His deep expertise and exceptional problem-solving skills have significantly improved our projects. His dedication to writing high-quality code and his ability to integrate complex features seamlessly are truly impressive. Working with him has been a rewarding experience, and his contributions have greatly advanced our development efforts.",
    name: "Ziad Ehab",
    title: "Senior PHP Developer at ACME IES",
    img: "/ziad-ehab.png",
  },
  {
    quote:
      "The contributions of Omar to our team have been exceptional. His profound expertise and ability to tackle complex challenges have significantly advanced our projects. Consistently delivering high-quality code and integrating sophisticated features with ease, his collaboration has driven impressive progress in our development efforts.",
    name: "Jean Pierre",
    title: "CTO at Leadmedia.ca",
    img: "/jean-pierre.png",
  },
  {
    quote:
      "Testing Omar’s code has always been a positive experience. His commitment to quality and thoroughness in coding resulted in fewer bugs and smoother testing phases. His ability to integrate complex features without introducing issues demonstrated his strong technical skills. Working with him has been a pleasure, and his contributions have greatly enhanced our project outcomes.",
    name: "Abdelrahman Essam",
    title: "Senior Quality Control at Dedalus Egypt",
    img: "/abdelrahman-essam.png",
  },
  {
    quote:
      "Omar’s contributions as Vice Head of the Project Management team at Enactus were exceptional. His organizational skills and proactive approach played a key role in the success of our projects. His ability to manage complex tasks and coordinate effectively with the team ensured that our initiatives were executed seamlessly. His dedication and leadership were truly commendable.",
    name: "Khaled Gamal",
    title: "Head of Enactus Egypt",
    img: "/khaled-gamal.png",
  },
  {
    quote:
      "Throughout our university journey, Omar demonstrated exceptional technical skills and dedication. His knack for tackling challenging problems and proactive approach made him a standout teammate. His passion for computer science and commitment to our projects significantly contributed to our collective success. Working with him was both inspiring and rewarding.",
    name: "Ebrahim Aboulfadl",
    title: "Back-End Developer at National Technologies",
    img: "/ebrahim-aboulfadl.png",
  },
];

export const companies = [
  {
    id: 1,
    name: "ACME IES",
    img: "/acme.webp",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "Leadmedia",
    img: "/leadmedia.webp",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "Enactus",
    img: "/enactus.webp",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "AOU",
    img: "/aou.webp",
    nameImg: "/aou-name.png",
  },
  // {
  //   id: 5,
  //   name: "docker.",
  //   img: "/dock.svg",
  //   nameImg: "/dockerName.svg",
  // },
];

export const workExperience = [
  {
    id: 1,
    title: "Backend Engineer - The Address Holding",
    desc: "Leading backend development for large-scale CRM-ERP systems. Optimizing performance with Redis caching, MySQL query optimization, and implementing Clean Architecture principles.",
    className: "md:col-span-2",
    thumbnail: "/theaddress.webp",
    period: "01/2025 - Present",
    type: "Full-time"
  },
  {
    id: 2,
    title: "Senior Full Stack PHP Developer - Welhof",
    desc: "Developing server-side applications using PHP, Yii, MySQL. Designing RESTful APIs and ensuring system scalability for Netherlands-based projects.",
    className: "md:col-span-2",
    thumbnail: "/welhof.webp",
    period: "10/2024 - Present",
    type: "Part-time"
  },
  {
    id: 3,
    title: "Full Stack PHP Developer - ACME IES",
    desc: "Contributed to Egyptian government digital transformation projects. Built scalable systems using Laravel, MySQL, React. Enhanced e-commerce platforms and optimized high-traffic applications.",
    className: "md:col-span-2",
    thumbnail: "/acme.webp",
    period: "10/2022 - 01/2025",
    type: "Full-time"
  },
  {
    id: 4,
    title: "Web Developer - Leadmedia",
    desc: "Creating custom websites for Canadian real estate brokers. Developing tailored solutions to meet unique business needs in the real estate industry.",
    className: "md:col-span-2",
    thumbnail: "/leadmedia.webp",
    period: "2022 - 2024",
    type: "Freelance"
  },
  {
    id: 5,
    title: "Vice Head of PM - Enactus",
    desc: "Led project management team coordination and strategic planning. Managed cross-functional teams and drove successful project outcomes in social entrepreneurship initiatives.",
    className: "md:col-span-2",
    thumbnail: "/enactus.webp",
    period: "01/2019 - 05/2022",
    type: "Volunteer"
  },
  {
    id: 6,
    title: "Computer Science Student - Arab Open University",
    desc: "Pursuing Bachelor's degree in Computer Science with focus on software engineering, algorithms, and system design. Building strong foundation in programming fundamentals and advanced concepts.",
    className: "md:col-span-2",
    thumbnail: "/aou.webp",
    period: "2018 - 2022",
    type: "Education"
  },
];

export const socialMedia = [
  {
    id: 1,
    title: "Gitlab",
    img: "/gitlab-footer.svg",
    link: "https://gitlab.com/derbalajr",
  },
  {
    id: 2,
    title: "Github",
    img: "/git.svg",
    link: "https://github.com/derbalajr",
  },
  {
    id: 3,
    title: "Linkedin",
    img: "/link.svg",
    link: "https://www.linkedin.com/in/derbalajr/",
  },
  {
    id: 4,
    title: "Upwork",
    img: "/upwork.svg",
    link: "https://www.upwork.com/freelancers/derbalajr",
  },
];
