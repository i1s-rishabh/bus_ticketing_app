

const authenticate = async(req, res, next)=>{
        try {
            const user = await User.findById(req.user.id).select('-password')
            res.send(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error')
        }
}