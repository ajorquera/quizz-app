import * as yup from 'yup';

export default yup.object().shape({
  uid: yup.string(),
  type: yup.string().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
});