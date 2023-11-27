export const backendNav={
	text: '后端自习室',
	activeMatch: '/backend/',
	items: [
		{
			text: '嗨你好吗',
			items:[
				{text: 'Node.js', link:'/backend/nodejs/'},
				{text: 'NestJS', link:'/backend/nestjs/'},
				{text: 'C++', link:'/backend/CPP/'},
				{text: 'C#&NET', link:'/backend/Csharp/'},
			]
		},
		{
			text: '服务',
			items:[
				{text: 'Nginx', link:'/backend/nginx/'},
				{text: 'Git', link:'/backend/gitLearn/'},
			]
		},
	]
}
