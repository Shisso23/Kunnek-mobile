import _ from 'lodash';

export const queryFormModel = (createQueryModel = {}) => ({
  description: _.get(createQueryModel, 'description', ''),
  connectedParcel: _.get(createQueryModel, 'connectedParcel', ''),
  connectedParcelId: _.get(createQueryModel, 'connectedParcelId', ''),
  issueType: _.get(createQueryModel, 'issueType', ''),
});

export const apiQueryModal = (createQueryModel = {}) => ({
  query: {
    issue: _.get(createQueryModel, 'issueType', ''),
    comment: _.get(createQueryModel, 'description', ''),
    job_id: _.get(createQueryModel, 'connectedParcelId', ''),
    user_id: _.get(createQueryModel, 'userId', ''),
  },
});
