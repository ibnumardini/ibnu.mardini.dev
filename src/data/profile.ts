export interface SocialLink {
	label: string;
	url: string;
	icon: 'github' | 'linkedin' | 'mail';
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
}

export const profile = {
	name: 'Muhammad Fatkurozi',
	title: 'Software Engineer | Back-end Developer',
	summary:
		'Backend Engineer with 5+ years of experience specializing in high-scale REST APIs, distributed systems, and modern backend stacks (Go, JavaScript, Laravel). Experienced in leading backend teams, optimizing infrastructure, and delivering reliable production systems.',
	location: 'Yogyakarta, Indonesia',
	socials: [
		{ label: 'Email', url: 'mailto:hi@mardini.dev', icon: 'mail' },
		{ label: 'LinkedIn', url: 'https://linkedin.com/in/ibnumardini', icon: 'linkedin' },
		{ label: 'GitHub', url: 'https://github.com/ibnumardini', icon: 'github' },
	] satisfies SocialLink[],
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
	projects: [
		{
			title: 'SIMALU',
			description:
				'Sistem Informasi Manajemen Alumni: specialized software crafted to help educational institutions and organizations efficiently manage and maintain alumni relations.',
			tags: ['PHP', 'Laravel 11', 'MySQL 8', 'JavaScript', 'Bootstrap 5', 'Tabler.io'],
			repoUrl: 'https://github.com/ibnumardini/simalu',
		},
		{
			title: 'Wilayah ID API',
			description:
				'A RESTful API that provides structured Indonesian administrative region data from provinces to villages, designed to simplify integration of regional data into various applications.',
			tags: ['Go', 'MySQL', 'go-chi'],
			repoUrl: 'https://github.com/ibnumardini/wilayah-indonesia-api',
		},
		{
			title: 'My UMBY Profile API',
			description:
				'An API Gateway for securely verifying and retrieving student records at Universitas Mercu Buana Yogyakarta, including scraping and validating data from official academic sources.',
			tags: ['JavaScript', 'Node.js', 'Express.js'],
			repoUrl: 'https://github.com/ibnumardini/my-umby-profile-api',
		},
	] satisfies Project[],
};
