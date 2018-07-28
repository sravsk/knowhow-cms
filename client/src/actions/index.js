export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_COMPANY_HASH = 'CHANGE_COMPANY_HASH';
export const CHANGE_ROLE = 'CHANGE_ROLE'

export const changeUser = someUser => ({
  type: 'CHANGE_USER',
  someUser
});

export const changeCompanyHash = someCompHash => ({
  type: 'CHANGE_COMPANY_HASH',
  someCompHash
})

export const changeRole = role => ({
  type: 'CHANGE_ROLE',
  role
})
