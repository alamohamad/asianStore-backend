const jwt=require('jsonwebtoken');
const knex=require('knex');
const knexConfig=require('../../../knexfile')
const db=knex(knexConfig)

const Autherized = (codes) => {
    return async (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            try {
                const user = jwt.verify(token, 'mySecret');
                if (user) {
                    const user_id = user.user[0].user_id;
                    const group = await db('users_groups').where('user_id', user_id).first();
                    if (group) {
                        let permissions = [];
                        if (Array.isArray(codes)) {
                            permissions = await db('groups_permissions')
                                .leftJoin('permissions', 'groups_permissions.permission_id', 'permissions.permission_id')
                                .where('groups_permissions.group_id', group.group_id)
                                .whereIn('permissions.code', codes)
                                .select();
                        } else {
                            permissions = await db('groups_permissions')
                                .leftJoin('permissions', 'groups_permissions.permission_id', 'permissions.permission_id')
                                .where('groups_permissions.group_id', group.group_id)
                                .where('permissions.code', codes)
                                .select();
                        }

                        if (permissions.length > 0) {
                            next();
                        } else {
                            return res.json({
                                error: 'You are not authorized'
                            });
                        }
                    } else {
                        return res.json({
                            error: 'There is no group'
                        });
                    }
                } else {
                    res.json({
                        error: 'Invalid token'
                    });
                }
            } catch (e) {
                res.json({
                    error: 'Token does not exist'
                });
            }
        } else {
            res.json({
                error: 'Token does not exist'
            });
        }
    };
};

module.exports={Autherized};