

export const required = (message:string="Required")=>(value:any)=>{
    if(!value || value.toString().trim()==='')
        return {message}
}

export const range = (min:number,max:number,message?:string)=>(value:any)=>{

    if(isNaN(value))
        return;

    if(value<min){
        return {message:message || `${value} should be greater than ${min}`,min,value}
    } else if(value>max){
        return {message:message || `${value} should be less than ${max}`,max,value}
    }
}

export const lengthRange= (min:number,max:number, message?:string)=>(value:any)=>{
    value= value.toString();

    if(value.length<min){
        return {message:message || `${value} should have at least ${min} size`,min,value}

    } else if(value.length>max){
        return {message:message || `${value} should be at most ${max} size`,max,value}
    }
}

export const PhotoFormat = (message?: string) => (value: any) => {
    if (!value.toString().endsWith('.png')) {
        return { message: message || `Enter ${value} in PNG format` };
    }
};

export const Email = (message ?: string) => (value : any) => {
    if(!(value.toString().endsWith('@gmail.com'))){
        return {message:message || `Invalid Email Address`}
    }
}

export const Password = (message ?: string) => (value : any) => {
    if(value.toString().length < 12){
        return {message:message || `Password should contain atleast 12 Charecters`}
    }
}


type Schema={
    defaultValue?:any,
    validations?: [(value:any)=>any],
    converter?: (value:any)=>any,
}