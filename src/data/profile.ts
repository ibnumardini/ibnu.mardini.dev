export interface SocialLink {
	label: string;
	url: string;
	icon: 'github' | 'linkedin' | 'mail' | 'facebook' | 'instagram';
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
}

export interface ExternalLink {
	title: string;
	description: string;
	url: string;
	icon: string;
}

export const profile = {
	name: 'Muhammad Fatkurozi',
	title: 'Software Engineer | Back-end Developer',
	summary:
		'Backend Engineer with 5+ years of experience specializing in high-scale REST APIs, distributed systems, and modern backend stacks (Go, JavaScript, Laravel). Experienced in leading backend teams, optimizing infrastructure, and delivering reliable production systems.',
	location: 'Yogyakarta, Indonesia',
	cvUrl: 'http://s.id/fatkur-cv-download',
	socials: [
		{ label: 'GitHub', url: 'https://github.com/ibnumardini', icon: 'github' },
		{ label: 'Facebook', url: 'https://fb.com/ibnumardini/', icon: 'facebook' },
		{ label: 'Instagram', url: 'https://instagram.com/ibnu.mardini.dev/', icon: 'instagram' },
		{ label: 'LinkedIn', url: 'https://linkedin.com/in/ibnumardini', icon: 'linkedin' },
		{ label: 'Email', url: 'mailto:hi@mardini.dev', icon: 'mail' },
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
				'PHP', 'JavaScript', 'TypeScript', 'Go', 'Laravel', 'CodeIgniter', 'Node.js',
				'Express.js', 'NestJs', 'AdonisJs', 'Echo Framework', 'GORM', 'Prisma',
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
				'GNU/Linux', 'Docker', 'Kubernetes', 'Nginx', 'Haproxy', 'Traefik',
				'Object Storage S3', 'OpenTelemetry', 'Grafana', 'Loki', 'Prometheus', 'GitLab CI/CD', 'Dokploy',
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
		{ name: 'Belajar Dasar Pemrograman Web', issuer: 'Dicoding', year: '2022' },
		{ name: 'Belajar Membuat Aplikasi Backend untuk Pemula dengan Cloudeka', issuer: 'Dicoding', year: '2022' },
		{ name: 'Belajar Membuat Aplikasi Backend untuk Pemula', issuer: 'Dicoding', year: '2022' },
		{ name: 'Belajar Dasar Pemrograman JavaScript', issuer: 'Dicoding', year: '2021' },
		{ name: 'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)', issuer: 'Dicoding', year: '2021' },
	] satisfies CertificationEntry[],
	projects: [
		{
			title: 'logn',
			description: 'A simple Go library for log management, designed to keep logging setup minimal and consistent across Go projects.',
			tags: ['Go'],
			repoUrl: 'https://github.com/ibnumardini/logn',
		},
		{
			title: 'Hutang Piutang App',
			description: 'A web app for managing transactions of debts and receivables.',
			tags: ['PHP', 'MySQL'],
			repoUrl: 'https://github.com/ibnumardini/hutang-piutang-app',
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
			description: 'A web interface for securely verifying and retrieving student records at Universitas Mercu Buana Yogyakarta.',
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
			description: 'Your space to think, write, and stay organized.',
			tags: ['PHP', 'CodeIgniter 4', 'MySQL'],
			repoUrl: 'https://github.com/ibnumardini/NoteSpace',
		},
	] satisfies Project[],
};
