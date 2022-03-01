


type uid=number;
type key=string;
type fk=number;
type bool=boolean;

var fields =[
	"id",
	"type",
	"count",
]

export class 所需道具Row{
	
        /**
         * id
         **/
        id:number = 0



        /**
         * 种类
         **/
        type:string = ""



        /**
         * 数量
         **/
        count:number = 0



}

let 所需道具:所需道具Row []=[];

var rowData=
[
	[1001,"redstone",1],
	[1002,"apple",2],
	[1003,"apple",3],
]

let tableData: any[] = []
for (let record of rowData) {
    let obj = new 所需道具Row () as any
    for(let i = 0;i<fields.length;i++) {
        let key = fields[i]
        obj[key] = record[i]
    }
    tableData.push(obj)
}



for(let r of tableData){
    所需道具 .push(r);
	
}

export default 所需道具
