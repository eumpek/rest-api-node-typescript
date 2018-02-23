import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE,FORBIDDEN_403_HTTP_CODE,  NOT_FOUND_404_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_DELETE_ROLE} from '../../../../utils/constants';
import {fakeRoles} from '../../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to delete role when unauthenticated', async () => {
    const response = await request.delete(`${API_ROUTE_V1}/roles/1`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to delete role when invalid token provided in authorization header', async () => {
    const response = await request.delete(`${API_ROUTE_V1}/roles/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to delete role when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.delete(`${API_ROUTE_V1}/roles/1`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });

  it('should fail to delete role which does not exists', async () => {
    const user = await createUserWithPermission(service, CAN_DELETE_ROLE);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.delete(`${API_ROUTE_V1}/roles/999`)
                                  .set('Authorization' , validToken);

    expectError(response, NOT_FOUND_404_HTTP_CODE);
  });

  it('should successfuly delete role when authenticated and have permissions', async () => {
    const user = await createUserWithPermission(service, CAN_DELETE_ROLE);
    const roleData = fakeRoles({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['id','name','description']
    }); 
    const roleToBeDeleted = await service.createRole(roleData);
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.delete(`${API_ROUTE_V1}/roles/${roleToBeDeleted.id}`)
                                  .set('Authorization' , validToken);

    expect(response.status).toBe(OK_200_HTTP_CODE);

    const secondResponse = await request.delete(`${API_ROUTE_V1}/roles/${roleToBeDeleted.id}`)
                                        .set('Authorization' , validToken);

    expect(secondResponse.status).toBe(NOT_FOUND_404_HTTP_CODE);
  });
});