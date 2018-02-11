import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {CAN_DELETE_POST} from '../../../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_DELETE_POST});

    const {post_id} = req.params;

    await config.service.deletePostById({id: post_id});

    res.status(OK_200_HTTP_CODE).json({success: true});
  });
};