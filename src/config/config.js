export const cookieOptions={
    httpOnly:true,
    secure:process.env.NODE_ENV==='production', // Set to true in production
    sameSite:'lax', 
    maxAge:24*60*5 // 5 minutes
}