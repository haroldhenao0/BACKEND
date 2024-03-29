const TaskScheme = require("../Models/TaskScheme")

const crearTask = async (req, res = express.request) => {
    const task = new TaskScheme(req.body);

    try{
        task.user = req.uid;
        const saved = await task.save();
        res.json({
            ok: true,
            task: saved
        })
    } catch(error){
        console.log( error );
        res.status(500).json({
            ok: false,
            task: 'Internal Error'
        })
    }
}
