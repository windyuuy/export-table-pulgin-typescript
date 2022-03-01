


type uid=number;
type key=string;
type fk=number;
type bool=boolean;

var fields =[
	"uid",
	"sceneId",
	"outingBaseGold",
	"a",
	"sd",
	"jfew",
	"wef",
]

export class SceneConfigRow{
	
        /**
         * uid
         **/
        uid:number = 0



        /**
         * 场景名
         **/
        sceneId:string = ""



        /**
         * 出行基础金币收益
         **/
        outingBaseGold:number = 0



        /**
         * xx
         **/
        a:number[] = []



        /**
         * dfg
         **/
        sd:string[] = []



        /**
         * wefw
         **/
        jfew:object = null as any



        /**
         * fwf
         **/
        wef:object[] = []



}

let SceneConfig:SceneConfigRow []=[];

var rowData=
[
	[1,"第1章 格莫拉城",1000,[1000],["wkjf"],{},[{}]],
	[2,"第2章 纳皮尔乐园",1200,[1200,223],["ww;fjj"],{"wjf":32},[{"wjf":32}]],
]

let tableData: any[] = []
for (let record of rowData) {
    let obj = new SceneConfigRow () as any
    for(let i = 0;i<fields.length;i++) {
        let key = fields[i]
        obj[key] = record[i]
    }
    tableData.push(obj)
}



for(let r of tableData){
    SceneConfig .push(r);
	
}

export default SceneConfig
