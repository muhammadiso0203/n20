function Component(constructor: Function){
   console.log(`Class name: ${constructor.name}`)
}

function LogMethod(target:any,methodName: string,descriptor: PropertyDescriptor){
   console.log(`Method name: ${methodName}`)
   console.log(`Method descriptor: ${JSON.stringify(descriptor)}`)
}

function LogProperty(target:any,properyName: string){
   console.log(`Property name: ${properyName}`)
}

function LogAccessor(target:any,accessorName:string,descriptor: PropertyDescriptor){
   console.log(`Log name: ${accessorName}`)
   console.log(`Log descriptor: ${JSON.stringify(descriptor)}`)
}

function LogParam(target:any, paramName: string, paramIndex: number){
   console.log(`Param name: ${paramName}`)
   console.log(`Param index: ${paramIndex}`)

}

@Component
class ComponentClass{
    
    @LogProperty
    title:string;

    constructor(title:string){
        this.title = title
    }
    
    @LogMethod
    add(@LogParam x:number, @LogParam y:number):number{
        return x + y
    }
    
    @LogAccessor
    get getInfo():string{
        return this.title
    }
}



