export const cookieOptions={
    httpOnly:true,
    secure:false, // Set to true in production
    sameSite:'lax', 
    maxAge:60*60*24*30 // 5 minutes
}