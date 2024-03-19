// both  try catch and promises and .then can be used to make asyn handler

// promises--------------------------------------------------------------
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// try-catch------------------------------------------------------
// const asyncHandler=(fn)=>async(res,req,next)=>{

//     try {

//     } catch (error) {
//         res.status(err.code || 500 ).json({
//             success:false,
//             message:err.message
//         })

//     }
// }

module.exports = {
  asyncHandler,
};
