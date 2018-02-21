import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {CAN_GET_PERMISSION} from '../../../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    
    const user = await getAuthUser({req, service: config.service});

    hasPermission({ user, permissionName: CAN_GET_PERMISSION});

    const {permission_id} = req.params;
    
    const fetchedPermission = await config.service.getPermissionById({id: permission_id});
    
    res.status(OK_200_HTTP_CODE).json(fetchedPermission);
  });
}
  
  