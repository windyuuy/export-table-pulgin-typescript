

export class SceneConfig{
	/** 出行基础金币收益 */
	gold!: number
}

export type TSceneConfigMap = { [key: string]: SceneConfig }
export const SceneConfigMap: TSceneConfigMap =
{
    "1000" : {
		"gold": 1000,
	},
    "1200" : {
		"gold": 1200,
	},
}
