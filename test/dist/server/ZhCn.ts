

export class ZhCn{
	/** 语句索引 */
	语句索引!: string
	/** 译文 */
	译文!: string
}

export type TZhCnMap = { [key: string]: ZhCn }
export const ZhCnMap: TZhCnMap =
{
    "先去召集所有的小伙伴吧" : {
		"语句索引": "先去召集所有的小伙伴吧", "译文": "先去召集所有的小伙伴吧!\n\n你召集的小伙伴:",
	},
    "某某小伙伴收集进度" : {
		"语句索引": "某某小伙伴收集进度", "译文": "${名字}小伙伴: ${当前数量}/${总数}",
	},
}
