const result:string[] = []
export let TreeNode = (Arraylist:any)=>{

        Arraylist.map((item:any)=>{
            if(item.children){
                TreeNode(item.children)
            }
            else{
                result.push(item)
            }
        })
        return result
}