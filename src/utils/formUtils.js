export function validateFields(fields = []) {
    return fields.every((value) => value.trim() !== '');
}
  