export function formDataToObject(formData) {
  let obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
