
export const success = (data = null) => {
  return {
    code: 200,
    message: 'success',
    data
  };
};