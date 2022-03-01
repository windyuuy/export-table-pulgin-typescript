


type uid=number;
type key=string;
type fk=number;
type bool=boolean;

var fields =[
	"id",
	"levelMin",
	"levelMax",
]

export class 所需等级Row{
	
        /**
         * id
         **/
        id:number = 0



        /**
         * 最小等级
         **/
        levelMin:number = 0



        /**
         * 最大等级
         **/
        levelMax:number = 0



}

let 所需等级:所需等级Row []=[];

var rowData=
[
	[1001,1,2],
	[1002,2,3],
]

let tableData: any[] = []
for (let record of rowData) {
    let obj = new 所需等级Row () as any
    for(let i = 0;i<fields.length;i++) {
        let key = fields[i]
        obj[key] = record[i]
    }
    tableData.push(obj)
}



for(let r of tableData){
    所需等级 .push(r);
	
}

export default 所需等级
