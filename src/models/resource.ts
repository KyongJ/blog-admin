export interface resource {
    key: number;
    id: number;
    parentId:number;
    requestMethod: string;
    resourceName:string;
    url:string;
    isDisbale:boolean;
    isAnonymous:boolean
}