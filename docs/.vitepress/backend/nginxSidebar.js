import { walk } from "../scripts/utils";
const baseDir = './docs/articles/backend/nginx/'
export const nginxSidebar = [
	walk(baseDir,'基础知识'),
	walk(baseDir,'配置相关'),
	walk(baseDir,'其它'),
]
