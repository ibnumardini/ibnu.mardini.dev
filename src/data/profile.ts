export interface SocialLink {
	label: string;
	url: string;
	icon: string;
}

export interface ContactCta {
	label: string;
	url: string;
	icon: string;
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export interface ExperienceEntry {
	company: string;
	companyUrl?: string;
	role: string;
	dates: string;
	bullets: string[];
}

export interface Project {
	title: string;
	description: string;
	tags: string[];
	repoUrl: string;
	liveUrl?: string;
	pinned?: boolean;
}

export interface EducationEntry {
	institution: string;
	institutionUrl?: string;
	program: string;
	dates: string;
}

export interface CertificationEntry {
	name: string;
	issuer: string;
	year: string;
	credentialUrl?: string;
}

export interface ExternalLink {
	title: string;
	description: string;
	url: string;
	icon: string;
}

export const profile = {
	name: 'Muhammad Fatkurozi',
	username: 'ibnumardini',
	title: 'Software Engineer | Back-end Developer',
	summary:
		'Backend Engineer with 5+ years of experience specializing in high-scale REST APIs, distributed systems, and modern backend stacks (Go, JavaScript, Laravel). Experienced in leading backend teams, optimizing infrastructure, and delivering reliable production systems.',
	location: 'Yogyakarta, Indonesia',
	cvUrl: 'https://docs.google.com/document/d/10jEKHz9dVOidL-HIlIyVba3p2lmTQHJpcHN6k5EHW34/export?format=pdf',
	contact: { label: "Let's Talk", url: 'mailto:hi@mardini.dev', icon: 'tabler:mail' } satisfies ContactCta,
	socials: [
		{ label: 'Email', url: 'mailto:hi@mardini.dev', icon: 'tabler:mail' },
		{ label: 'GitHub', url: 'https://github.com/ibnumardini', icon: 'tabler:brand-github' },
		{ label: 'X', url: 'https://x.com/ibnumardini', icon: 'tabler:brand-x' },
		{ label: 'Facebook', url: 'https://fb.com/ibnumardini/', icon: 'tabler:brand-facebook' },
		{ label: 'Instagram', url: 'https://instagram.com/ibnu.mardini.dev/', icon: 'tabler:brand-instagram' },
		{ label: 'LinkedIn', url: 'https://linkedin.com/in/ibnumardini', icon: 'tabler:brand-linkedin' },
	] satisfies SocialLink[],
	elsewhere: [
		{
			title: 'link.mardini.dev',
			description: 'All my links and profiles in one place.',
			url: 'https://link.mardini.dev/',
			icon: 'tabler:link',
		},
		{
			title: 'write.fatkur.id',
			description: 'A more personal blog and journal.',
			url: 'https://write.fatkur.id/',
			icon: 'tabler:notebook',
		},
		{
			title: 'Medium',
			description: 'Articles and writing published on Medium.',
			url: 'https://ibnumardini.medium.com/',
			icon: 'tabler:brand-medium',
		},
	] satisfies ExternalLink[],
	skills: [
		{
			category: 'Backend',
			items: [
				'PHP',
				'JavaScript',
				'TypeScript',
				'Go',
				'Laravel',
				'CodeIgniter',
				'Node.js',
				'Express.js',
				'NestJs',
				'AdonisJs',
				'Echo Framework',
				'GORM',
				'Prisma',
			],
		},
		{
			category: 'Frontend',
			items: ['HTML', 'CSS', 'ReactJS', 'Alpine.js', 'jQuery', 'Sass', 'Tailwind CSS', 'Bootstrap', 'Ant Design'],
		},
		{
			category: 'DBMS',
			items: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Redis', 'Firebase'],
		},
		{
			category: 'DevOps & Infrastructure',
			items: [
				'GNU/Linux',
				'Docker',
				'Kubernetes',
				'Nginx',
				'Haproxy',
				'Traefik',
				'Object Storage S3',
				'OpenTelemetry',
				'Grafana',
				'Loki',
				'Prometheus',
				'GitLab CI/CD',
				'Dokploy',
			],
		},
		{
			category: 'Cloud Platforms',
			items: ['AWS', 'Vultr', 'Google Cloud', 'GitLab', 'GitHub', 'Firebase', 'Cloudflare'],
		},
		{
			category: 'Tools',
			items: ['Git', 'Helm', 'RabbitMQ', 'Vite', 'Jira', 'Postman', 'VSCode'],
		},
	] satisfies SkillGroup[],
	experience: [
		{
			company: 'PT Kedata Indonesia Digital',
			companyUrl: 'https://kedata.online',
			role: 'Backend Developer',
			dates: 'Dec 2025 - Present',
			bullets: [
				'Enhance and support legacy APIs and apps on Go and PostgreSQL.',
				'Architected advanced synchronization workflows to guarantee high-precision data alignment across multiple heterogeneous databases.',
			],
		},
		{
			company: 'PT Teknologi Pelanggan Bahagia (PT TPB)',
			companyUrl: 'https://woo-wa.com',
			role: 'Web Developer',
			dates: 'Jan 2025 - Nov 2025',
			bullets: [
				'Modernize and maintain legacy APIs and apps on Express.js and Laravel.',
				'Implement CI/CD for better deployment and reduce manual processes by 98%.',
				'Improved the application by integrating RabbitMQ and Server-Sent Events for real-time reminder notifications.',
			],
		},
		{
			company: 'Woowa CRM',
			companyUrl: 'https://woowacrm.com',
			role: 'Backend Lead',
			dates: 'March 2024 - Jan 2025',
			bullets: [
				'Effectively led a team of 3-4 members to achieve project goals.',
				'Conducted comprehensive code reviews on merge requests to prevent potential production bugs.',
				'Organize application deployment to a Kubernetes cluster with 100% zero downtime.',
				'Enhanced developer experience (DX) by ensuring 100% of generated code meets standards.',
			],
		},
		{
			company: 'Woowa CRM',
			companyUrl: 'https://woowacrm.com',
			role: 'Backend Web Developer',
			dates: 'April 2022 - Feb 2024',
			bullets: [
				'Entrusted with the design, development, and maintenance of RESTful API services and Web App products, using Node.js, Express.js, TypeScript, NestJs, ReactJs, Laravel, MySQL, PostgreSQL, MongoDB, Redis, Firebase, Docker, Kubernetes.',
				'Efficiently manage millions of contact records, ensuring rapid response times.',
				'Design an expandable database schema to accommodate growing data needs.',
			],
		},
		{
			company: 'PT Qodr Bee Berinovasi',
			companyUrl: 'https://qodrbee.com',
			role: 'Web Developer',
			dates: 'Sept 2019 - April 2022',
			bullets: [
				'Entrusted with designing, building, and sustaining client websites, information systems, RESTful APIs, and company products using PHP, WordPress, Laravel, CodeIgniter, Go, MySQL, PostgreSQL, and RabbitMQ.',
				"Developed a streamlined version of the company's WordPress plugin, optimizing performance by reducing 80% of non-essential features.",
				'Successfully developed a high-volume WhatsApp broadcast application in Go, leveraging RabbitMQ for efficient message handling and delivery.',
			],
		},
	] satisfies ExperienceEntry[],
	education: [
		{
			institution: 'Universitas Mercu Buana Yogyakarta (UMBY)',
			institutionUrl: 'https://umby.ac.id',
			program: 'S.Kom, Computer Science (GPA: 3.86/4)',
			dates: 'Sept 2023 - Present',
		},
		{
			institution: 'Qodr.id',
			institutionUrl: 'https://qodr.id',
			program: 'Senior Web Developer, Bootcamp',
			dates: 'July 2019 - July 2022',
		},
	] satisfies EducationEntry[],
	certifications: [
		{
			name: 'Belajar Dasar Pemrograman JavaScript',
			issuer: 'Dicoding',
			year: '2021',
			credentialUrl: 'https://www.dicoding.com/certificates/EYZRNONLMZYY',
		},
		{
			name: 'Belajar Membuat Aplikasi Back-End untuk Pemula',
			issuer: 'Dicoding',
			year: '2021',
			credentialUrl: 'https://www.dicoding.com/certificates/98XWW4OBXKM3',
		},
		{
			name: 'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)',
			issuer: 'Dicoding',
			year: '2021',
			credentialUrl: 'https://www.dicoding.com/certificates/4EXG86L4QZRL',
		},
		{
			name: 'Belajar Dasar Pemrograman Web',
			issuer: 'Dicoding',
			year: '2022',
			credentialUrl: 'https://www.dicoding.com/certificates/1OP86MOROZXQ',
		},
		{
			name: 'Belajar Membuat Aplikasi Front-End untuk Pemula',
			issuer: 'Dicoding',
			year: '2022',
			credentialUrl: 'https://www.dicoding.com/certificates/JLX1GEYVN272',
		},
		{
			name: 'Belajar Membuat Aplikasi Web dengan React',
			issuer: 'Dicoding',
			year: '2022',
			credentialUrl: 'https://www.dicoding.com/certificates/1UXYM8Y9XXYM',
		},
		{
			name: 'Belajar Fundamental Front-End Web Development',
			issuer: 'Dicoding',
			year: '2022',
			credentialUrl: 'https://www.dicoding.com/certificates/EYX49WGKOPDL',
		},
		{
			name: 'PRO22-Batch 2-React Developer',
			issuer: 'Digital Talent Scholarship',
			year: '2022',
			credentialUrl:
				'https://www.linkedin.com/posts/ibnumardini_pro22-batch-2-react-developer-activity-6972190327638028288-Zegc',
		},
		{
			name: 'Belajar Membuat Aplikasi Back-End untuk Pemula dengan Cloudeka',
			issuer: 'Dicoding',
			year: '2022',
			credentialUrl: 'https://www.dicoding.com/certificates/1OP85933LPQK',
		},
		{
			name: 'Menjadi Front-End Web Developer Expert',
			issuer: 'Dicoding',
			year: '2023',
			credentialUrl: 'https://www.dicoding.com/certificates/N9ZO48KKRZG5',
		},
	] satisfies CertificationEntry[],
	projects: [
		{
			title: 'logn',
			description:
				'A simple Go library for log management, designed to keep logging setup minimal and consistent across Go projects.',
			tags: ['Go'],
			repoUrl: 'https://github.com/ibnumardini/logn',
		},
		{
			title: 'Hutang Piutang App',
			description: 'A web app for managing transactions of debts and receivables.',
			tags: ['PHP', 'MySQL', 'Bootstrap 5'],
			repoUrl: 'https://github.com/ibnumardini/hutang-piutang-app',
			liveUrl: 'https://hutang-piutang.mardini.dev/',
		},
		{
			title: 'SIMALU',
			description:
				'SIMALU is specialized software crafted to assist educational institutions and organizations in effectively overseeing alumni relations',
			tags: ['PHP', 'Laravel 11', 'MySQL 8', 'JavaScript', 'Bootstrap 5', 'Tabler.io'],
			repoUrl: 'https://github.com/ibnumardini/simalu',
			liveUrl: 'https://simalu.mardini.dev/',
			pinned: true,
		},
		{
			title: 'My UMBY Profile API',
			description:
				'An API Gateway for securely verifying and retrieving student records at Universitas Mercu Buana Yogyakarta, including scraping and validating data from official academic sources.',
			tags: ['JavaScript', 'Node.js', 'Express.js'],
			repoUrl: 'https://github.com/ibnumardini/my-umby-profile-api',
			liveUrl: 'https://my-umby-profile-api.vercel.app/',
		},
		{
			title: 'My UMBY Profile',
			description:
				'A web interface for securely verifying and retrieving student records at Universitas Mercu Buana Yogyakarta.',
			tags: ['JavaScript', 'React.js', 'Vite'],
			repoUrl: 'https://github.com/ibnumardini/my-umby-profile',
			liveUrl: 'https://umby.mardini.dev/',
		},
		{
			title: 'Wilayah Indonesia',
			description: 'A CLI tool to manage and transform Indonesian administrative region data.',
			tags: ['JavaScript', 'Node.js', 'Commander.js'],
			repoUrl: 'https://github.com/ibnumardini/wilayah-indonesia',
		},
		{
			title: 'Wilayah ID API',
			description:
				'A RESTful API that provides structured Indonesian administrative region data from provinces to villages, designed to simplify integration of regional data into various applications.',
			tags: ['Go', 'MySQL', 'go-chi'],
			repoUrl: 'https://github.com/ibnumardini/wilayah-indonesia-api',
			liveUrl: 'https://wilayah-indonesia-api.mardini.dev/swagger/index.html',
			pinned: true,
		},
		{
			title: 'Dengue Expert App',
			description: 'An expert system for diagnosing dengue fever (DBD) using rule-based reasoning.',
			tags: ['PHP', 'Laravel', 'Filament', 'MySQL'],
			repoUrl: 'https://github.com/ibnumardini/dengue-expert-app',
			liveUrl: 'https://es-dbd-backend.umby.dev/',
		},
		{
			title: 'MeetKeep',
			description: 'A Chrome extension that automatically injects a meeting timer into Google Meet.',
			tags: ['JavaScript', 'Chrome Extension'],
			repoUrl: 'https://github.com/ibnumardini/meetkeep',
			liveUrl: 'https://ibnumardini.github.io/meetkeep/',
		},
		{
			title: 'NoteSpace',
			description: 'A personal note-taking and organization app for writing, thinking, and staying organized.',
			tags: ['PHP', 'CodeIgniter 4', 'MySQL'],
			repoUrl: 'https://github.com/ibnumardini/NoteSpace',
			liveUrl: 'https://notespace.mardini.dev/',
		},
	] satisfies Project[],
};
