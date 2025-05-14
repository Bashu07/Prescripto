import jwt from 'jsonwebtoken'

// Doctor authentication middleware
const authDoctor = async(req, res, next) => {
    try {
        const { dtoken } = req.headers
        
        if(!dtoken) {
            return res.json({ success: false, message: 'Not authorized User Login' })
        }
        
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        
        // Initialize req.body if it doesn't exist
        if (!req.body) {
            req.body = {}
        }
        
        // Add userId to req.body
        req.body.docId = token_decode.id
        
        // You can also attach user info to req directly for more reliability
        req.userId = token_decode.id
        
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authDoctor