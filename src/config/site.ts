export const defaultLocale = "zh";

export const locales = {
	zh: {
		label: "中文",
		lang: "zh-CN",
		path: "/",
	},
	en: {
		label: "English",
		lang: "en",
		path: "/en/",
	},
} as const;

export type Locale = keyof typeof locales;

const githubUrl = "https://github.com/torchpycharm";
const ecgRepoUrl = "https://github.com/torchpycharm/FYP_Embedded-Implementation-of-Data-Integrity-Detection-for-Wearable-ECG-Devices";
const quadcopterRepoUrl = "https://github.com/Crystal-PuNK/Quadcopter_Group3";
const guideVehicleRepoUrl = "https://github.com/huaji1hao/Pi7_RemoteControl_DeepLearning_Vehicle";
const resumePdf = "/resume/FangyuZhang-CV.pdf";

const shared = {
	email: "2902134839@qq.com",
	emailIcon: "@",
	avatar: "/avatar.png",
	background: {
		image: "",
		blur: "0px",
		opacity: 0,
		scale: 1,
		overlay: "radial-gradient(circle at top left, rgba(255,255,255,0.12), transparent 30%), linear-gradient(180deg, #050505 0%, #000 55%, #090909 100%)",
		rain: {
			enabled: false,
			mode: "falling",
			density: 0.7,
			speed: 1,
			dropColor: "rgba(210, 230, 255, 0.5)",
			rippleColor: "rgba(210, 230, 255, 0.34)",
			maxDrops: 170,
			maxRipples: 48,
		},
	},
	socials: [
		{ label: "GitHub", href: githubUrl, icon: "GH" },
	],
};

const skillsZh = [
	"C/C++",
	"Python",
	"Verilog HDL",
	"ARM 汇编",
	"Linux",
	"STM32",
	"Arduino",
	"Raspberry Pi",
	"Nordic nRF5340",
	"Zephyr RTOS",
	"FreeRTOS",
	"μC/OS-II",
	"USART / I²C / SPI / CAN",
	"BLE",
	"TensorFlow Lite Micro",
	"PID 控制",
	"Git",
];

const skillsEn = [
	"C/C++",
	"Python",
	"Verilog HDL",
	"ARM Assembly",
	"Linux",
	"STM32",
	"Arduino",
	"Raspberry Pi",
	"Nordic nRF5340",
	"Zephyr RTOS",
	"FreeRTOS",
	"μC/OS-II",
	"USART / I²C / SPI / CAN",
	"BLE",
	"TensorFlow Lite Micro",
	"PID Control",
	"Git",
];

const siteConfigs = {
	zh: {
		...shared,
		name: "张方宇",
		title: "NUS 计算机工程硕士在读 · 嵌入式工程师",
		description: "张方宇的个人网站：嵌入式软件、端侧机器学习（TinyML / 边缘计算）、RTOS、机器人与电机控制方向的项目、笔记和简历。",
		nav: [
			{ label: "首页", href: "/" },
			{ label: "关于我", href: "/about" },
			{ label: "项目", href: "/projects" },
			{ label: "博客", href: "/blog" },
			{ label: "图谱", href: "/graph" },
			{ label: "简历", href: "/resume" },
			{ label: "联系", href: "/contact" },
		],
		quickLinks: [
			{ label: "项目", href: "/projects", icon: "作" },
			{ label: "博客", href: "/blog", icon: "书" },
			{ label: "简历", href: "/resume", icon: "历" },
			{ label: "GitHub", href: githubUrl, icon: "GH" },
		],
		ui: {
			headerCta: "发邮件",
			projectCta: "查看项目 ->",
			projectLiveCta: "访问项目",
			projectRepoCta: "查看代码",
			projectStackLabel: "技术栈",
			projectVideosLabel: "视频",
			projectGalleryLabel: "图集",
			backToList: "返回列表",
			socialCardCta: "查看主页",
		},
		status: {
			title: "当前状态",
			current: "正在：在 NUS 读计算机工程硕士",
			next: "接下来：补上外骨骼、四旋翼和导盲小车的项目页",
			note: "最近完成：可穿戴 ECG 端侧数据完整性检测",
			timeLabel: "我的当前时间",
			timeZone: "Asia/Singapore",
			dateLocale: "zh-CN",
		},
		home: {
			eyebrowNote: "本科毕业于电子科技大学软件工程专业，现在新加坡国立大学读计算机工程硕士。",
			headline: "在资源受限的\u200B硬件上，\u200B把算法\u200B真正跑起来。",
			intro: "我做嵌入式软件、端侧机器学习和机器人控制：从底层驱动、RTOS 移植、电机控制，到把模型部署到 MCU 上做推理。这里放我的项目、笔记和简历。",
			primaryCta: { label: "看看项目", href: "/projects" },
			secondaryCta: { label: "查看简历", href: "/resume" },
		},
		pages: {
			home: {
				title: "首页",
				description: "张方宇的个人网站：嵌入式软件、端侧机器学习（TinyML / 边缘计算）、RTOS、机器人与电机控制方向的项目、笔记和简历。",
				modules: [
					{ type: "homeHero" },
					{ type: "linkGrid", props: { items: [
						"嵌入式软件",
						"端侧机器学习 / TinyML",
						"RTOS",
						"机器人与电机控制",
					] } },
					{
						type: "projectGrid",
						props: {
							kicker: "Projects",
							title: "精选项目",
							description: "每个项目都写清楚要解决的问题、最后的结果和实现过程。",
							featuredOnly: true,
							limit: 3,
							columns: 3,
						},
					},
					{
						type: "blogPreview",
						props: {
							kicker: "Notes",
							title: "最新笔记",
							description: "嵌入式、端侧机器学习和课程学习过程中的记录。",
							limit: 3,
						},
					},
					{ type: "contactPanel" },
				],
			},
			about: {
				title: "关于我",
				description: "张方宇：新加坡国立大学计算机工程硕士在读，本科毕业于电子科技大学软件工程专业，方向为嵌入式软件、端侧机器学习、RTOS、机器人与电机控制。",
				modules: [
					{
						type: "aboutIntro",
						props: {
							kicker: "About",
							heading: "做嵌入式软件，把算法落到真实硬件上。",
							intro: "嵌入式软件 · 端侧机器学习（TinyML / 边缘计算）· RTOS · 机器人与电机控制",
							profileLabel: "Profile",
							profile: "新加坡国立大学计算机工程硕士在读，本科毕业于电子科技大学软件工程专业。",
							paragraphs: [
								"我叫张方宇，本科就读于电子科技大学信息与软件工程学院软件工程专业（2022.09 – 2026.06），目前在新加坡国立大学攻读计算机工程硕士（Master of Science in Computer Engineering）。方向是嵌入式软件、端侧机器学习（TinyML / 边缘计算）、RTOS，以及机器人与电机控制。",
								"2025 年 1 月到 8 月，我在华西医院–商汤科技联合实验室做嵌入式软件开发，参与下肢柔性外骨骼机器人项目：实时步态分割、双环 PID 控制三相无刷电机、CAN 与 RabbitMQ 通信，以及用贝叶斯优化做个性化助力。",
								"本科毕业设计是在 nRF5340 上做可穿戴 ECG 的端侧数据完整性检测：在板上提取特征、运行模型，只把有效数据通过 BLE 发出去。更早的项目还有基于 STM32 的四旋翼飞控（移植 μC/OS-II、手写底层驱动、姿态解算）和基于树莓派 + Arduino 的智能导盲小车。",
							],
						},
					},
					{
						type: "skillCloud",
						props: {
							title: "技能栈",
							skills: skillsZh,
						},
					},
					{ type: "contactPanel" },
				],
			},
			projects: {
				title: "项目",
				description: "张方宇的项目：可穿戴 ECG 端侧数据完整性检测等嵌入式软件与端侧机器学习项目。",
				modules: [
					{
						type: "projectGrid",
						props: {
							kicker: "Portfolio",
							title: "项目 / 作品集",
							description: "嵌入式软件、端侧机器学习和机器人控制方向的项目，每个都写清楚问题、结果和实现过程。",
							columns: 2,
							largePadding: true,
						},
					},
				],
			},
			blog: {
				title: "博客",
				description: "张方宇的博客：嵌入式软件、端侧机器学习、RTOS 和机器人控制方向的笔记。",
				modules: [
					{
						type: "blogIndex",
						props: {
							kicker: "Notes",
							title: "博客 / 笔记",
							description: "记录嵌入式、端侧机器学习、RTOS 和机器人控制方向的学习过程与项目复盘。",
							labels: {
								search: "搜索标题、摘要或标签",
								all: "全部",
								empty: "没有找到符合条件的笔记。",
								noPosts: "还没有发布文章，写好之后会出现在这里。",
							},
						},
					},
				],
			},
			graph: {
				title: "知识图谱",
				description: "由博客文章之间的双链生成的知识图谱。",
				controls: { repulsion: "斥力", distance: "间距", motion: "动态" },
				modules: [
					{
						type: "knowledgeGraph",
						props: {
							kicker: "Graph",
							title: "知识图谱",
							description: "每篇笔记是一个节点，双链是它们之间的连线。",
							emptyText: "还没有可以展示的笔记。发布文章并用 [[双链]] 互相引用后，这里会生成图谱。",
						},
					},
				],
			},
			resume: {
				title: "简历",
				description: "张方宇的简历：教育背景、实习经历、项目和技能。",
				profileLabel: "Profile",
				emailLabel: "Email",
				linksLabel: "Links",
				skillsLabel: "Skills",
				highlightsLabel: "Highlights",
				modules: [
					{
						type: "resume",
						props: {
							kicker: "Resume",
							title: "简历",
							description: "教育背景、实习经历、项目和技能。",
						},
					},
				],
			},
			contact: {
				title: "联系",
				description: "联系张方宇：邮箱和 GitHub。",
				modules: [
					{
						type: "contactCards",
						props: {
							kicker: "Contact",
							heading: "想聊嵌入式、\u200B端侧机器学习，\u200B或者有项目\u200B想一起做，\u200B欢迎来信。",
							intro: "邮件是最稳妥的联系方式；代码和项目在 GitHub。",
						},
					},
				],
			},
		},
		contactPanel: {
			kicker: "Contact",
			heading: "对这些项目感兴趣，\u200B或者想聊嵌入式\u200B和端侧机器学习，\u200B欢迎联系我。",
		},
		skills: skillsZh,
		resume: {
			summary: "方向是嵌入式软件与端侧机器学习。做过外骨骼机器人的步态识别与电机控制、nRF5340 上的端侧心电数据完整性检测，以及基于 STM32 的四旋翼飞控。",
			details: [
				{ label: "硕士", value: "新加坡国立大学（NUS）· 计算机工程（Master of Science in Computer Engineering）· 2026 – 至今" },
				{ label: "本科", value: "电子科技大学（985 / 211 / 双一流，成都）· 信息与软件工程学院 · 软件工程 · 2022.09 – 2026.06 · GPA 3.80 / 4.00" },
				{ label: "英语", value: "CET-6 · IELTS" },
				{ label: "所在地", value: "新加坡" },
				{ label: "方向", value: "嵌入式软件 / 端侧机器学习（TinyML / 边缘计算）/ RTOS / 机器人与电机控制" },
			],
			links: [
				{ label: "GitHub", href: githubUrl },
				{ label: "项目", href: "/projects" },
				{ label: "联系", href: "/contact" },
			],
			files: [
				{ label: "下载简历 PDF", href: resumePdf },
			],
			highlights: [
				"优秀奖学金（2022–2024）",
				"优秀共青团员",
				"校优秀社会实践个人",
				"2025 网络技术挑战赛省级二等奖",
				"电子科技大学尔绮工作室主席",
				"学生社团联合会外联部长",
				"学院学生科助理",
			],
			sections: [
				{
					title: "经历",
					items: [
						{
							period: "2025.01 – 2025.08",
							title: "嵌入式软件开发工程师",
							org: "华西医院–商汤科技联合实验室",
							description: "项目：弱能力老人运动机理驱动的下肢柔性外骨骼机器人。",
							bullets: [
								"步态生成：通过特征提取和步态分割，把步态实时分成 6 个阶段，准确率 98%，并解算行走速度与轨迹。",
								"电机控制：用双环 PID 控制三相无刷电机，以电流、速度、位移为参数产生拉力，在老人行走时提供助力。",
								"通信：开发板与上位机之间走 CAN，上位机与 PC 之间用 RabbitMQ，交互频率 250 Hz。",
								"个性化助力：用贝叶斯优化在预训练的 PSS 参数空间中搜索最佳助力时机和大小，23 分钟完成；胫骨前肌（TA）激活度降低 54.2%；对接华西医院，适配偏瘫、中风等多种足下垂患者。",
								"上位机：建立病人档案数据库，供康复医师按病情设计训练方案，训练数据可视化并保存分析。",
							],
							points: ["PID 控制", "三相无刷电机", "CAN", "RabbitMQ", "贝叶斯优化"],
							link: [],
						},
					],
				},
				{
					title: "项目",
					items: [
						{
							period: "2025.10 – 2026.04",
							title: "基于边缘计算的可穿戴 ECG 数据完整性检测系统",
							org: "本科毕业设计 · nRF5340",
							description: "在设备端先判断一段心电数据是否完整，只把有效数据通过 BLE 上传。",
							bullets: [
								"在 nRF5340 上跑通完整流程：提取 6 维特征、板上推理，只发送被判定为有效的窗口。",
								"对比 13 种算法 × 浮点 / INT8 共 26 种模型配置，最终选定 SVM：测试准确率 100%，单次推理约 1 ms。",
								"只传完整数据的 BLE 传输策略，使整体功耗降低 13.7%。",
								"搭建完整的软硬件验证平台，对比各模型在板上的准确率、推理时间和功耗。",
							],
							points: ["nRF5340", "Zephyr", "TensorFlow Lite Micro", "BLE"],
							link: [
								{ name: "项目详情", href: "/projects/ecg-integrity" },
								{ name: "代码仓库", href: ecgRepoUrl },
							],
						},
						{
							period: "2023.09 – 2024.06",
							title: "基于 STM32 的四旋翼无人机",
							org: "STM32F401RET6 · μC/OS-II",
							description: "",
							bullets: [
								"基于 STM32F401RET6 自主编写飞控、自主搭建飞行器，实现稳定飞行。",
								"移植 μC/OS-II，重构时钟、中断、任务切换，按优先级调度飞行任务。",
								"用 C/C++ 和 ARM 汇编按芯片手册编写 USART、I²C 等底层驱动。",
								"用四元数、高斯–牛顿迭代推导并实现姿态解算。",
							],
							points: ["STM32", "μC/OS-II", "C/C++", "ARM 汇编"],
							link: [
								{ name: "代码仓库", href: quadcopterRepoUrl },
							],
						},
						{
							period: "2024.06 – 2024.07",
							title: "基于树莓派 + Arduino 的智能导盲小车",
							org: "Raspberry Pi · Arduino",
							description: "",
							bullets: [
								"用 HTTP + Flask 以视频流方式让大模型与网页实时通信，展示对各类猫的识别结果和识别率。",
								"黑线循迹 + PID 控制保持车道，Dijkstra 路径规划，差速转向。",
							],
							points: ["Raspberry Pi", "Arduino", "Flask", "PID 控制", "Dijkstra"],
							link: [
								{ name: "代码仓库", href: guideVehicleRepoUrl },
							],
						},
					],
				},
			],
		},
	},
	en: {
		...shared,
		name: "Fangyu Zhang",
		title: "MSc Computer Engineering @ NUS · Embedded Engineer",
		description: "Personal site of Fangyu Zhang: projects, notes, and résumé on embedded software, on-device machine learning (TinyML / edge computing), RTOS, and robotics and motor control.",
		nav: [
			{ label: "Home", href: "/" },
			{ label: "About", href: "/about" },
			{ label: "Projects", href: "/projects" },
			{ label: "Blog", href: "/blog" },
			{ label: "Graph", href: "/graph" },
			{ label: "Resume", href: "/resume" },
			{ label: "Contact", href: "/contact" },
		],
		quickLinks: [
			{ label: "Projects", href: "/projects", icon: "P" },
			{ label: "Blog", href: "/blog", icon: "B" },
			{ label: "Resume", href: "/resume", icon: "R" },
			{ label: "GitHub", href: githubUrl, icon: "GH" },
		],
		ui: {
			headerCta: "Email me",
			projectCta: "View project ->",
			projectLiveCta: "Visit project",
			projectRepoCta: "View code",
			projectStackLabel: "Stack",
			projectVideosLabel: "Videos",
			projectGalleryLabel: "Gallery",
			backToList: "Back to list",
			socialCardCta: "View profile",
		},
		status: {
			title: "Status",
			current: "Now: MSc in Computer Engineering at NUS",
			next: "Next: project pages for the exoskeleton, quadcopter, and guide vehicle",
			note: "Recently finished: on-device ECG data integrity detection",
			timeLabel: "My local time",
			timeZone: "Asia/Singapore",
			dateLocale: "en-US",
		},
		home: {
			eyebrowNote: "Software Engineering graduate from UESTC, now pursuing an MSc in Computer Engineering at the National University of Singapore.",
			headline: "Making algorithms actually run on constrained hardware.",
			intro: "I work on embedded software, on-device machine learning, and robot control — from low-level drivers, RTOS porting, and motor control to deploying models on microcontrollers for inference. This site collects my projects, notes, and résumé.",
			primaryCta: { label: "View projects", href: "/projects" },
			secondaryCta: { label: "View résumé", href: "/resume" },
		},
		pages: {
			home: {
				title: "Home",
				description: "Personal site of Fangyu Zhang: projects, notes, and résumé on embedded software, on-device machine learning (TinyML / edge computing), RTOS, and robotics and motor control.",
				modules: [
					{ type: "homeHero" },
					{ type: "linkGrid", props: { items: [
						"Embedded software",
						"On-device ML / TinyML",
						"RTOS",
						"Robotics & motor control",
					] } },
					{
						type: "projectGrid",
						props: {
							kicker: "Projects",
							title: "Selected projects",
							description: "Each project is written up with the problem it solves, the results, and how it was built.",
							featuredOnly: true,
							limit: 3,
							columns: 3,
						},
					},
					{
						type: "blogPreview",
						props: {
							kicker: "Notes",
							title: "Latest notes",
							description: "Notes from working on embedded systems, on-device machine learning, and coursework.",
							limit: 3,
						},
					},
					{ type: "contactPanel" },
				],
			},
			about: {
				title: "About",
				description: "Fangyu Zhang: MSc student in Computer Engineering at NUS with a Bachelor's in Software Engineering from UESTC, focused on embedded software, on-device machine learning, RTOS, and robotics and motor control.",
				modules: [
					{
						type: "aboutIntro",
						props: {
							kicker: "About",
							heading: "Embedded software, with algorithms that land on real hardware.",
							intro: "Embedded software · On-device machine learning (TinyML / edge computing) · RTOS · Robotics & motor control",
							profileLabel: "Profile",
							profile: "MSc student in Computer Engineering at the National University of Singapore; Bachelor's in Software Engineering from UESTC.",
							paragraphs: [
								"I'm Fangyu Zhang. I studied Software Engineering at the School of Information and Software Engineering, University of Electronic Science and Technology of China (UESTC), from September 2022 to June 2026, and I'm now pursuing a Master of Science in Computer Engineering at the National University of Singapore (NUS). My focus is embedded software, on-device machine learning (TinyML / edge computing), RTOS, and robotics and motor control.",
								"From January to August 2025 I worked as an embedded software engineer at the West China Hospital – SenseTime Joint Lab on a soft lower-limb exoskeleton robot: real-time gait segmentation, dual-loop PID control of three-phase brushless motors, CAN and RabbitMQ communication, and personalized assistance tuned with Bayesian optimization.",
								"My final-year project was on-device data integrity detection for wearable ECG on the nRF5340: extracting features and running the model on the board, and sending only valid data over BLE. Earlier projects include an STM32 quadcopter flight controller (porting μC/OS-II, hand-written low-level drivers, attitude estimation) and a smart guide vehicle built on Raspberry Pi and Arduino.",
							],
						},
					},
					{
						type: "skillCloud",
						props: {
							title: "Skills",
							skills: skillsEn,
						},
					},
					{ type: "contactPanel" },
				],
			},
			projects: {
				title: "Projects",
				description: "Projects by Fangyu Zhang: on-device data integrity detection for wearable ECG and other embedded software and on-device machine learning work.",
				modules: [
					{
						type: "projectGrid",
						props: {
							kicker: "Portfolio",
							title: "Projects / Portfolio",
							description: "Projects in embedded software, on-device machine learning, and robot control, each written up with the problem, the results, and the implementation.",
							columns: 2,
							largePadding: true,
						},
					},
				],
			},
			blog: {
				title: "Blog",
				description: "Fangyu Zhang's blog: notes on embedded software, on-device machine learning, RTOS, and robot control.",
				modules: [
					{
						type: "blogIndex",
						props: {
							kicker: "Notes",
							title: "Blog / Notes",
							description: "Learning notes and project write-ups on embedded systems, on-device machine learning, RTOS, and robot control.",
							labels: {
								search: "Search title, summary, or tags",
								all: "All",
								empty: "No notes match the current filters.",
								noPosts: "No posts published yet. They will show up here once written.",
							},
						},
					},
				],
			},
			graph: {
				title: "Knowledge Graph",
				description: "A knowledge graph generated from the wiki links between blog posts.",
				controls: { repulsion: "Repulsion", distance: "Distance", motion: "Motion" },
				modules: [
					{
						type: "knowledgeGraph",
						props: {
							kicker: "Graph",
							title: "Knowledge Graph",
							description: "Each note is a node; wiki links are the edges between them.",
							emptyText: "No notes to show yet. Once posts are published and connected with [[wiki links]], the graph will appear here.",
						},
					},
				],
			},
			resume: {
				title: "Resume",
				description: "Fangyu Zhang's résumé: education, experience, projects, and skills.",
				profileLabel: "Profile",
				emailLabel: "Email",
				linksLabel: "Links",
				skillsLabel: "Skills",
				highlightsLabel: "Highlights",
				modules: [
					{
						type: "resume",
						props: {
							kicker: "Resume",
							title: "Resume",
							description: "Education, experience, projects, and skills.",
						},
					},
				],
			},
			contact: {
				title: "Contact",
				description: "Contact Fangyu Zhang by email or on GitHub.",
				modules: [
					{
						type: "contactCards",
						props: {
							kicker: "Contact",
							heading: "Want to talk about embedded systems, on-device ML, or a project to build together? Email me.",
							intro: "Email is the most reliable way to reach me; code and projects live on GitHub.",
						},
					},
				],
			},
		},
		contactPanel: {
			kicker: "Contact",
			heading: "If any of these projects interests you, or you want to talk about embedded systems and on-device ML, get in touch.",
		},
		skills: skillsEn,
		resume: {
			summary: "Focused on embedded software and on-device machine learning. I have worked on gait recognition and motor control for an exoskeleton robot, on-device ECG data integrity detection on the nRF5340, and an STM32 quadcopter flight controller.",
			details: [
				{ label: "Master's", value: "National University of Singapore (NUS) · MSc in Computer Engineering · 2026 – Present" },
				{ label: "Bachelor's", value: "University of Electronic Science and Technology of China (UESTC; Project 985 / Project 211 / Double First-Class), Chengdu · School of Information and Software Engineering · Software Engineering · 2022.09 – 2026.06 · GPA 3.80 / 4.00" },
				{ label: "English", value: "CET-6 · IELTS" },
				{ label: "Location", value: "Singapore" },
				{ label: "Focus", value: "Embedded software / On-device ML (TinyML / edge computing) / RTOS / Robotics & motor control" },
			],
			links: [
				{ label: "GitHub", href: githubUrl },
				{ label: "Projects", href: "/projects" },
				{ label: "Contact", href: "/contact" },
			],
			files: [
				{ label: "Download résumé (PDF)", href: resumePdf },
			],
			highlights: [
				"Outstanding Student Scholarship (2022–2024)",
				"Outstanding Communist Youth League Member",
				"University-level Outstanding Individual in Social Practice",
				"Provincial Second Prize, 2025 Network Technology Challenge",
				"President, Erqi Studio, UESTC",
				"Head of External Relations, Student Associations Union",
				"Assistant, School Student Affairs Office",
			],
			sections: [
				{
					title: "Experience",
					items: [
						{
							period: "2025.01 – 2025.08",
							title: "Embedded Software Engineer",
							org: "West China Hospital – SenseTime Joint Lab",
							description: "Project: a soft lower-limb exoskeleton robot driven by the movement mechanisms of elderly people with reduced mobility.",
							bullets: [
								"Gait generation: feature extraction and gait segmentation split the gait into 6 phases in real time with 98% accuracy, and solve for walking speed and trajectory.",
								"Motor control: dual-loop PID control of a three-phase brushless motor, using current, speed, and displacement as parameters to generate a pulling force that assists the wearer while walking.",
								"Communication: CAN between the development board and the host computer, RabbitMQ between the host computer and the PC, exchanging data at 250 Hz.",
								"Personalized assistance: Bayesian optimization searches a pre-trained PSS parameter space for the best assistance timing and magnitude, finishing in 23 minutes; tibialis anterior (TA) activation dropped by 54.2%. Worked with West China Hospital to adapt the system to patients with foot drop from hemiplegia, stroke, and other conditions.",
								"Host software: a patient record database that lets rehabilitation physicians design training plans by condition, with training data visualized and saved for analysis.",
							],
							points: ["PID control", "BLDC motor", "CAN", "RabbitMQ", "Bayesian optimization"],
							link: [],
						},
					],
				},
				{
					title: "Projects",
					items: [
						{
							period: "2025.10 – 2026.04",
							title: "On-Device Data Integrity Detection for Wearable ECG (nRF5340)",
							org: "Final Year Project · nRF5340",
							description: "Decide on the device whether a segment of ECG data is intact, and upload only valid data over BLE.",
							bullets: [
								"Full pipeline running on the nRF5340: 6-dimensional feature extraction, on-board inference, and transmission of only the windows judged valid.",
								"Compared 26 model configurations (13 algorithms × float / INT8) and selected an SVM: 100% test accuracy, about 1 ms per inference.",
								"Sending only intact data over BLE reduced overall power consumption by 13.7%.",
								"Built a complete hardware and software test platform to compare each model's on-board accuracy, inference time, and power consumption.",
							],
							points: ["nRF5340", "Zephyr", "TensorFlow Lite Micro", "BLE"],
							link: [
								{ name: "Project page", href: "/projects/ecg-integrity" },
								{ name: "Repository", href: ecgRepoUrl },
							],
						},
						{
							period: "2023.09 – 2024.06",
							title: "STM32-Based Quadcopter",
							org: "STM32F401RET6 · μC/OS-II",
							description: "",
							bullets: [
								"Wrote the flight controller and built the aircraft from scratch on an STM32F401RET6, achieving stable flight.",
								"Ported μC/OS-II, reworking the clock, interrupts, and task switching, and scheduled flight tasks by priority.",
								"Wrote low-level drivers such as USART and I²C in C/C++ and ARM assembly, working from the chip manual.",
								"Derived and implemented attitude estimation using quaternions and Gauss–Newton iteration.",
							],
							points: ["STM32", "μC/OS-II", "C/C++", "ARM assembly"],
							link: [
								{ name: "Repository", href: quadcopterRepoUrl },
							],
						},
						{
							period: "2024.06 – 2024.07",
							title: "Smart Guide Vehicle Based on Raspberry Pi + Arduino",
							org: "Raspberry Pi · Arduino",
							description: "",
							bullets: [
								"Used HTTP and Flask to stream video so that a large model and a web page communicate in real time, showing recognition results and recognition rates for different kinds of cats.",
								"Black-line following with PID control to stay in lane, Dijkstra path planning, and differential steering.",
							],
							points: ["Raspberry Pi", "Arduino", "Flask", "PID control", "Dijkstra"],
							link: [
								{ name: "Repository", href: guideVehicleRepoUrl },
							],
						},
					],
				},
			],
		},
	},
} as const;

export function isLocale(locale: string | undefined): locale is Locale {
	return locale === "zh" || locale === "en";
}

export function getLocaleFromUrl(url: URL): Locale {
	const firstSegment = url.pathname.split("/").filter(Boolean)[0];
	return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function localizePath(locale: Locale, path: string): string {
	if (path.startsWith("http") || path.startsWith("mailto:")) return path;
	if (locale === defaultLocale) return path;
	if (path === "/") return `/${locale}/`;
	if (path.startsWith(`/${locale}/`)) return path;
	return `/${locale}${path}`;
}

function localizeModuleLinks(module: { type: string; props?: Record<string, unknown> }, locale: Locale) {
	if (module.type === "linkGrid") {
		const props = module.props as { items?: Array<string | { href?: string }> } | undefined;
		return {
			...module,
			props: {
				...module.props,
				items: props?.items?.map((item) => (
					typeof item === "string" ? item : { ...item, href: item.href ? localizePath(locale, item.href) : item.href }
				)),
			},
		};
	}

	return module;
}

function localizeSiteLinks<T extends typeof siteConfigs[Locale]>(config: T, locale: Locale): T {
	return {
		...config,
		nav: config.nav.map((item) => ({ ...item, href: localizePath(locale, item.href) })),
		quickLinks: config.quickLinks.map((item) => ({ ...item, href: localizePath(locale, item.href) })),
		home: {
			...config.home,
			primaryCta: { ...config.home.primaryCta, href: localizePath(locale, config.home.primaryCta.href) },
			secondaryCta: { ...config.home.secondaryCta, href: localizePath(locale, config.home.secondaryCta.href) },
		},
		pages: {
			...config.pages,
			...Object.fromEntries(
				Object.entries(config.pages).map(([key, page]) => [
					key,
					"modules" in page
						? { ...page, modules: page.modules.map((module) => localizeModuleLinks(module, locale)) }
						: page,
				]),
			),
		},
		resume: {
			...config.resume,
			links: config.resume.links.map((item) => ({ ...item, href: localizePath(locale, item.href) })),
			sections: config.resume.sections.map((section) => ({
				...section,
				items: section.items.map((item) => ({
					...item,
					link: item.link.map((link) => ({ ...link, href: localizePath(locale, link.href) })),
				})),
			})),
		},
	} as T;
}

export function getSiteConfig(localeOrUrl: Locale | URL = defaultLocale) {
	const locale = localeOrUrl instanceof URL ? getLocaleFromUrl(localeOrUrl) : localeOrUrl;
	return localizeSiteLinks(siteConfigs[locale], locale);
}

export const siteConfig = getSiteConfig(defaultLocale);
