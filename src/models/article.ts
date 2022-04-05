interface tag{
    id:number,
    tagName:string
}

interface category{
    id:number,
    categoryName:string
}

export interface conditionType{
    categoryList:category[]
    tagList:tag[],
}

export interface Article {
    key: number;
    id: number;
    articleCover: string;
    articleTitle: string;
    categoryName: string;
    tagDTOList: any[];
    viewsCount: number;
    createTime: Date;
    updateTime: Date;
    isTop: number;
    isDraft: number;
    isDelete: number;
}

export interface ArticleInfo{
    id?: number;
    articleCover?: string;
    articleTitle?: string;
    articleContent?:string,
    categoryId?: number;
    tagIdList?: number[];
    isTop?: number;
    isDraft?: number;
}

