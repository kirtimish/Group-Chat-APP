const Group = require('../models/group')
const User = require('../models/user')
const Usergroup = require('../models/userGroup')

exports.getGroups = async(req,res,next) => {
    try {
        let groups = await Usergroup.findAll({where:{userId:req.user.userId}})
        let data = [];

        for(let i=0;i<groups.length;i++){
            let group = await Group.findByPk(groups[i].groupId)
            data.push(group);
        }
        if(!data){
            res.status(500).json({message:'No data found'})
        }
        res.status(500).json({ message: 'found groups'})
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.createGroup = async (req,res,next) => {
    const {grp} = req.body;

    try {
        if(!grp){
            res.status(500).json({ message: 'no name entered' })
        }

        let data = await req.user.createGroup({name: grp})
        res.status(500).json({ message: 'successfully created new group'})

    } catch (error) {
        return res.status(500).json(error)
    }
}