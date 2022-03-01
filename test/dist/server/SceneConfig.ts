

export class SceneConfig{
	/** uid */
	uid!: number
	/** 场景名 */
	sceneId!: string
	/** 出行基础金币收益 */
	outingBaseGold!: number
	/** xx */
	a!: number[]
	/** dfg */
	sd!: string[]
	/** wefw */
	jfew!: object
	/** fwf */
	wef!: object[]
}

export type TSceneConfigMap = { [key: string]: SceneConfig }
export const SceneConfigMap: TSceneConfigMap =
{
    "1" : {
		"uid": 1, "sceneId": "第1章 格莫拉城", "outingBaseGold": 1000, "a": [1000], "sd": ["wkjf"], "jfew": {}, "wef": [{}],
	},
    "2" : {
		"uid": 2, "sceneId": "第2章 纳皮尔乐园", "outingBaseGold": 1200, "a": [1200, 223], "sd": ["ww;fjj"], "jfew": {"wjf":32}, "wef": [{"wjf":32}],
	},
}
