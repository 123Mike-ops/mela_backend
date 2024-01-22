// const QueryParams = {
// 	Sort,        
// 	Filter,       
// 	Page  ,       
// 	PerPage,      
// 	LinkOperator }
exports.MetaData={
    Page:"",
    PerPage:"",
    Sort:"",
    Filter:""
}

exports.MetaData =(Page, PerPage)=>{
    this.Page = Page;
    this.PerPage= PerPage;
    this.Sort=Sort;
    this.filter=filter;
  }
exports.SuccessResponseJson=(res, metaData, responseData, statusCode)=>{
        res.status(statusCode).json({
            MetaData: metaData,
            Data:     responseData,
        })
    }
exports.FailureResponseJson=(res,errData, statusCode)=>{
    res.status(statusCode).json({
        ErrData:     errData,
    })
}
       
// module.exports=SuccessResponseJson;
// module.exports=MetaData;
