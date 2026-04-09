// ===== PROJECT DATA =====

export const PROJECT_CATEGORIES = [
  {
    id: 'cat-wordpress',
    icon: '📦',
    folderIcon: '🔵',
    name: 'WordPress',
    color: '#21759b',
    desc: '10 projects — Custom themes, Elementor, WooCommerce, SEO',
    path: 'C:\\Users\\Maksim\\Projects\\WordPress'
  },
  {
    id: 'cat-react',
    icon: '📦',
    folderIcon: '⚛️',
    name: 'React',
    color: '#61dafb',
    desc: '1 project — Headless CMS, REST API, JWT Auth',
    path: 'C:\\Users\\Maksim\\Projects\\React'
  },
  {
    id: 'cat-node',
    icon: '📦',
    folderIcon: '🟩',
    name: 'Node.js / JS',
    color: '#68a063',
    desc: '1 project — Express.js, Tailwind, Web Tools',
    path: 'C:\\Users\\Maksim\\Projects\\Node.js'
  },
];

export const PROJECTS = {
  'cat-wordpress': [
    {
      id: 'atlas', icon: '🏢', name: 'Atlas Facilities',
      url: 'https://atlasfacilities.com/',
      type: 'Business / Corporate', status: 'Live',
      stack: ['HTML','CSS','JavaScript','PHP','Gutenberg'],
      features: ['Full desktop & mobile optimization','Performance improvements','Gutenberg block customization','SEO improvements'],
      desc: 'Optimization and development work on a facilities management company website. Main focus was HTML/CSS/JS/PHP refinements and Gutenberg block optimization.'
    },
    {
      id: 'aginsky', icon: '💰', name: 'Aginsky Capital',
      url: 'https://aginskycapital.com/',
      type: 'Finance', status: 'Live',
      stack: ['WordPress','Divi','CSS','JavaScript'],
      features: ['Custom Divi theme refinement','Visual redesign & branding','Responsive layout fixes','Content management'],
      desc: 'Visual customization and refinement of a capital investment company website. All work done within the Divi theme builder.'
    },
    {
      id: 'nossos', icon: '🛍️', name: 'Nossos RS',
      url: 'https://nossos.rs/',
      type: 'E-Commerce', status: 'Live',
      stack: ['WordPress','WooCommerce','Elementor Pro','CSS'],
      features: ['Full WooCommerce store setup','Product management','Custom checkout flow','Elementor Pro layouts'],
      desc: 'E-commerce store for a noseband horse equipment brand. Full WooCommerce implementation including product pages, cart, and checkout customization.'
    },
    {
      id: 'scolio', icon: '🏥', name: 'Scolio Team',
      url: 'https://scolioteam.rs/',
      type: 'Healthcare', status: 'Live',
      stack: ['WordPress','Elementor Pro','CSS','JavaScript'],
      features: ['Complete redesign from Divi to Elementor','Responsive medical site layout','Custom page templates','Performance optimization'],
      desc: 'Full redesign and redevelopment of a scoliosis treatment clinic website. Migrated the site from Divi to Elementor Pro with a complete visual overhaul.'
    },
    {
      id: 'benels', icon: '🔧', name: 'Benels',
      url: 'https://www.benels.com/',
      type: 'Corporate', status: 'Live',
      stack: ['HTML','CSS','JavaScript','PHP'],
      features: ['HTML/CSS/JS/PHP improvements','Proprietary CMS environment','UI fixes & refinements','Cross-browser testing'],
      desc: 'Participation in site improvements on a corporate website built in a proprietary company system. All changes made within their internal development environment.'
    },
    {
      id: 'barzikom', icon: '🍺', name: 'Barzikom',
      url: 'https://barzikom.com/',
      type: 'Restaurant / Bar', status: 'Live',
      stack: ['WordPress','Elementor Pro','Astra Theme','CSS'],
      features: ['Complete WordPress build from scratch','Elementor Pro custom layouts','Astra theme customization','Menu & gallery sections'],
      desc: 'Complete development of a bar/restaurant brand website using WordPress, Elementor Pro, and Astra theme. Built from scratch to launch.'
    },
    {
      id: 'shogun', icon: '⚔️', name: 'Shogun',
      url: 'https://www.shogun.mimacdoo.rs/',
      type: 'E-Commerce / Restaurant', status: 'Live',
      stack: ['WordPress','WooCommerce','Elementor Pro','Astra Theme'],
      features: ['WooCommerce online ordering','Elementor Pro custom templates','Astra theme base','Product catalog & cart'],
      desc: 'Full e-commerce development for a restaurant chain using Elementor Pro, Astra theme, and WooCommerce for online food ordering.'
    },
    {
      id: 'narature', icon: '🌿', name: 'Narature',
      url: 'https://narature.com/',
      type: 'Lifestyle / Nature', status: 'Live',
      stack: ['WordPress','Elementor Pro','CSS'],
      features: ['Complete site build','Elementor Pro layouts','Natural/organic design aesthetic','Product showcase'],
      desc: 'Complete development of a lifestyle and nature brand website using WordPress and Elementor Pro. Clean organic aesthetic with product showcase.'
    },
    {
      id: 'svpant', icon: '⛪', name: 'Sv. Pantelejmon',
      url: 'https://svpantelejmon.rs/',
      type: 'Church / NGO', status: 'Live',
      stack: ['WordPress','Elementor Pro'],
      features: ['Full site development','Event & news sections','Donation/contact info','Multilingual-ready structure'],
      desc: 'Complete WordPress website for a church organization. Includes news, events, and information sections built with Elementor Pro.'
    },
    {
      id: 'pentage', icon: '🏗️', name: 'Pentage Co',
      url: 'https://pentageco.rs/sr',
      type: 'Construction', status: 'Live',
      stack: ['WordPress','Elementor Pro','CSS'],
      features: ['Complete site build (2021)','Services & portfolio sections','Contact forms','Later redesigned by client'],
      desc: 'Complete construction company website built in 2021 with Elementor Pro. Note: client later redesigned the site themselves.'
    },
  ],
  'cat-react': [
    {
      id: 'optamaze', icon: '🚀', name: 'OptAmaze',
      url: 'https://optamaze.me',
      type: 'Personal Portfolio / Web App', status: 'In Progress',
      stack: ['React.js','JavaScript ES6+','Tailwind CSS','WordPress REST API','JWT','Axios','Node.js'],
      features: ['Headless WordPress architecture','React frontend with dynamic routing','JWT authentication for secure login','REST API data fetching with Axios','Tailwind CSS styling system'],
      desc: 'Personal portfolio site rebuilt as a headless WordPress + React project. WordPress acts as the CMS/backend, React handles the frontend. JWT auth secures content management.'
    },
  ],
  'cat-node': [
    {
      id: 'webtools', icon: '🛠️', name: 'Web Tools Suite',
      url: 'https://github.com/Maksim-Manojlovic',
      type: 'Web App / SaaS Tools', status: 'Active',
      stack: ['Node.js','Express.js','HTML','JavaScript','Tailwind CSS','npm','Git'],
      features: ['Image optimization tool','PDF management utilities','SEO analysis module','REST API endpoints','Postman-tested API'],
      desc: 'A set of web-based productivity tools focused on image optimization, PDF management, and SEO analysis. Node.js/Express backend with a clean HTML/JS/Tailwind frontend.'
    },
  ],
};

export function findProject(id) {
  for (const cat of PROJECT_CATEGORIES) {
    const found = PROJECTS[cat.id].find(p => p.id === id);
    if (found) return found;
  }
  return null;
}
