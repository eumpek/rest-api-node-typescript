
import {loginSignature, registerSignature, forgetPasswordSignature, resetPasswordSignature} from './auth';
import {createUserSignature, getUserByIdSignature,getUserByEmailSignature, getUsersSignature, updateUserSignature, deleteUserByIdSignature} from './users';
import {createPostSignature, getPostSignature, getPostsSignature, updatePostSignature, deletePostSignature } from './posts';
import {createCommentSignature, getCommentSignature, getCommentsSignature, updateCommentSignature, deleteCommentSignature } from './comments';
import {createRoleSignature, getRoleSignature, getRolesSignature, updateRoleSignature, deleteRoleSignature, assignUserRoleSignature, removeUserRoleSignature } from './roles';
import {getUserPermissionsSignature, createPermissionSignature, getPermissionSignature, getPermissionsSignature, updatePermissionSignature, deletePermissionSignature, assignRolePermissionSignature, removeRolePermissionSignature, CreateUserPermissionsSignature } from './permissions';
import CommonServiceSignature from './utils/CommonServiceSignature';
import {GetUserResetPasswordTokensSignature,CreateResetPasswordTokenSignature,GetResetPasswordTokenByTokenSignature} from './resetPasswordTokens';

export default interface Service {
  readonly login: loginSignature;
  readonly register: registerSignature;
  readonly forgetPassword: forgetPasswordSignature;
  readonly createResetPasswordToken: CreateResetPasswordTokenSignature;
  readonly getResetPasswordTokenByToken: GetResetPasswordTokenByTokenSignature;
  readonly getUserResetPasswordTokens: GetUserResetPasswordTokensSignature;
  readonly resetPassword: resetPasswordSignature;

  readonly createUser: createUserSignature;
  readonly getUserById: getUserByIdSignature;
  readonly getUserByEmail: getUserByEmailSignature;
  readonly getUsers: getUsersSignature;
  readonly updateUser: updateUserSignature;
  readonly deleteUserById: deleteUserByIdSignature;

  readonly createPost: createPostSignature;
  // readonly getPost: getPostSignature;
  readonly getPosts: getPostsSignature;
  // readonly updatePost: updatePostSignature;
  // readonly deletePost: deletePostSignature;

  // readonly createComment: createCommentSignature;
  // readonly getComment: getCommentSignature;
  // readonly getComments: getCommentsSignature;
  // readonly updateComment: updateCommentSignature;
  // readonly deleteComment: deleteCommentSignature;

  readonly createRole: createRoleSignature;
  // readonly getRole: getRoleSignature;
  // readonly getRoles: getRolesSignature;
  // readonly updateRole: updateRoleSignature;
  // readonly deleteRole: deleteRoleSignature;
  // readonly assignUserRole: assignUserRoleSignature;
  // readonly removeUserRole: removeUserRoleSignature;

  readonly createPermission: createPermissionSignature;
  // readonly getPermission: getPermissionSignature;
  // readonly getPermissions: getPermissionsSignature;
  // readonly updatePermission: updatePermissionSignature;
  // readonly deletePermission: deletePermissionSignature;
  // readonly assignRolePermission: assignRolePermissionSignature;
  // readonly removeRolePermission: removeRolePermissionSignature;
  readonly getUserPermissions: getUserPermissionsSignature;
  readonly createUserPermissions: CreateUserPermissionsSignature;
  readonly clearService: CommonServiceSignature;
  readonly migrate: CommonServiceSignature;
  readonly rollback: CommonServiceSignature;
}