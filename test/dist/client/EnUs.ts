

export class EnUs{
	/** 语句索引 */
	语句索引!: string
	/** 译文 */
	译文!: string
}

export type TEnUsMap = { [key: string]: EnUs }
export const EnUsMap: TEnUsMap =
{
    "先去召集所有的小伙伴吧" : {
		"语句索引": "先去召集所有的小伙伴吧", "译文": "summon your partaners!",
	},
    "某某小伙伴收集进度" : {
		"语句索引": "某某小伙伴收集进度", "译文": "${名字}parterners: ${当前数量}/${总数}",
	},
}
